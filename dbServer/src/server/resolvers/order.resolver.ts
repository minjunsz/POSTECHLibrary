import moment from "moment";
import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { compare, encrypt } from "../../../utils/password";
import { Order } from "../../entity/Order";
import { Seat } from "../../entity/Seat";
import { isAuth } from "../../middleware/isAuth";
import { COOKIE_NAME } from "../constants";
import { MyContext } from "../types";
// TODO: it seems like findeOne with relations uses two sql statements.
//        reimplement findone with query builder if it containes "relations"
@InputType()
export class OrderInput {
  @Field(() => Int)
  seatId: number;

  @Field()
  seatPassword: string;

  @Field()
  password: string;
};

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  seatId: number;

  @Field()
  seatPassword: string;

  @Field()
  password: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;
};

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class OrderResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Order, { nullable: true })
  order?: Order
}

@Resolver()
export class OrderResolver {
  @Query(() => Order, { nullable: true })
  me(
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.orderId) { //not logged in
      return null;
    }
    const user = Order.findOne(req.session.orderId);
    return user;
  }

  @Mutation(() => OrderResponse)
  async login(
    @Arg('args') args: OrderInput,
    @Ctx() { req }: MyContext
  ): Promise<OrderResponse> {
    const order = await Order.findOne({
      relations: ["seat"],
      where: { seatId: args.seatId }
    });

    if (!order) {
      return {
        errors: [{
          field: "seatId",
          message: "No such order."
        }]
      };
    }

    if (!await compare(order.seat.seatPassword, args.seatPassword)) {
      return {
        errors: [{
          field: "seatPassword",
          message: "Invalid seat password."
        }]
      };
    }

    if (!await compare(order.password, args.password)) {
      return {
        errors: [{
          field: "password",
          message: "Password mismatch."
        }]
      };
    }

    req.session.orderId = order.id;

    return { order };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolver, _) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolver(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolver(true);
      })
    })
  }

  @Mutation(() => OrderResponse)
  async createOrder(
    @Arg('args') args: CreateOrderInput,
    @Ctx() { req }: MyContext
  ): Promise<OrderResponse> {
    if (moment(args.startAt).isBefore(moment())) {
      return {
        errors: [{
          field: "startAt",
          message: "Invalid start time."
        }]
      };
    }
    if (moment(args.endAt).isSameOrBefore(args.startAt)) {
      return {
        errors: [{
          field: "endAt",
          message: "Invalid end time."
        }]
      };
    }

    const seat = await Seat.findOne({ id: args.seatId });

    if (!seat) {
      return {
        errors: [{
          field: "seatId",
          message: "No such seat data."
        }]
      };
    }
    if (!await compare(seat.seatPassword, args.seatPassword)) {
      return {
        errors: [{
          field: "seatPassword",
          message: "Invalid seat password."
        }]
      };
    }

    const alreadyExistedOrder = await Order.findOne({
      seatId: seat.id,
    });

    if (alreadyExistedOrder) {
      return {
        errors: [{
          field: "seatId",
          message: "Currently in use."
        }]
      };
    }

    const orderResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values({
        password: await encrypt(args.password),
        startAt: args.startAt,
        endAt: args.endAt,
        seatId: seat.id,
      })
      .execute();

    const order = await Order.findOne(orderResult.identifiers[0].id);

    if (!order) {
      return {
        errors: [{
          field: "ServerError",
          message: "Unexpectedly failed to create order."
        }]
      };
    } else {
      req.session.orderId = order.id;
      return { order, };
    }
  }

  @Mutation(() => OrderResponse)
  @UseMiddleware(isAuth)
  async deleteOrder(
    @Arg('seatId', () => Int) seatId: number,
    @Ctx() { req, res }: MyContext
  ): Promise<OrderResponse> {
    const order = await Order.findOne({
      relations: ["seat"],
      where: { seatId }
    });

    if (!order) {
      return {
        errors: [{
          field: "seatId",
          message: "No such order."
        }]
      };
    }

    if (req.session.orderId !== order.id) {
      return {
        errors: [{
          field: "Authentication",
          message: "You are not allowed to delete this order."
        }]
      };
    }

    const delResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where(`id = ${order.id}`)
      .execute();

    if (delResult.affected) {
      const sessionDestroyResult = await new Promise<boolean>((resolver) => {
        req.session.destroy((err) => {
          if (err) {
            console.error(err);
            resolver(false);
            return;
          }
          res.clearCookie(COOKIE_NAME);
          resolver(true);
          return;
        })
      })
      if (!sessionDestroyResult) { throw new Error('Failed to destroy login session'); }
      return { order };
    }
    else {
      throw new Error('Server failed to delete order');
    }
  }
}
