import { Resolver, InputType, Field, Arg, Mutation, ObjectType, Ctx, Query } from "type-graphql";
import { Order } from "../../entity/Order";
import { Seat } from "../../entity/Seat";
import { encrypt, compare } from "../../../utils/password";
import { getConnection } from "typeorm";
import moment from "moment";
import { MyContext } from "../types";

@InputType()
export class OrderInput {
  @Field()
  seatPassword: string;

  @Field()
  seatNumber: string;

  @Field()
  password: string;
};

@InputType()
export class CreateOrderInput {
  @Field()
  seatNumber: string;

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
    const seat = await Seat.findOne({
      seatNumber: args.seatNumber,
    });

    if (!seat) {
      return {
        errors: [{
          field: "seatNumber",
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

    const order = await Order.findOne({
      seatId: seat.id,
    });

    if (!order) {
      return {
        errors: [{
          field: "seatNumber",
          message: "No such order."
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

    const seat = await Seat.findOne({
      seatNumber: args.seatNumber,
    });

    if (!seat) {
      return {
        errors: [{
          field: "seatNumber",
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
          field: "seatNumber",
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
    const seat = await Seat.findOne({
      seatNumber: args.seatNumber,
    });

    if (!seat) {
      return {
        errors: [{
          field: "seatNumber",
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

    const order = await Order.findOne({
      seatId: seat.id,
    });

    if (!order) {
      return {
        errors: [{
          field: "seatNumber",
          message: "No such order."
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
