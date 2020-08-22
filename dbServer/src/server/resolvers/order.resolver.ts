import { Resolver, InputType, Field, Arg, Query, Mutation, ObjectType } from "type-graphql";
import { Order } from "../../entity/Order";
import { Seat } from "../../entity/Seat";
import { encrypt, compare } from "../../../utils/password";
import { getConnection } from "typeorm";
import moment from "moment";

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
  @Query(() => Order)
  async login(@Arg('args') args: OrderInput) {
    console.log(args);
    const order: Order = new Order();
    order.startAt = new Date('2020-04-10 10:00:00');
    order.endAt = new Date('2020-04-10 12:00:00');
    order.seatId = 1;
    order.id = 1;

    return order;
  }

  @Mutation(() => OrderResponse)
  async createOrder(@Arg('args') args: CreateOrderInput): Promise<OrderResponse> {
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
    if (!compare(seat.seatPassword, args.seatPassword)) {
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
    return { order, };
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
