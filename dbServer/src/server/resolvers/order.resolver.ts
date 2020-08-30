import { Resolver, InputType, Field, Arg, Mutation, ObjectType, Ctx, Query, Int } from "type-graphql";
import { Order } from "../../entity/Order";
import { Seat } from "../../entity/Seat";
import { encrypt, compare } from "../../../utils/password";
import { getConnection } from "typeorm";
import moment from "moment";
import { MyContext } from "../types";
import { COOKIE_NAME } from "../constants";
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
  async deleteOrder(@Arg('args') args: OrderInput): Promise<OrderResponse> {
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

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where(`id = ${order.id}`)
      .execute();

    return { order };
  }
}
