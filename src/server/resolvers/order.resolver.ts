import { Resolver, InputType, Field, Arg, Query, ObjectType } from "type-graphql";
import { Order } from "../../entity/Order";

@ObjectType()
class OrderResponse {
  @Field(() => Order, { nullable: true })
  data: Order

  @Field(() => [String], { nullable: true })
  error: [String]
}

@InputType()
class OrderInput {
  @Field()
  seatPassword: string;

  @Field()
  seatNumber: string;

  @Field()
  password: string;
};

@Resolver()
export class SeatResolver {
  @Query(() => OrderResponse)
  async login(@Arg('args', { nullable: false }) args: OrderInput) {
    console.log(args);
    const order: Order = new Order();
    order.startAt = new Date('2020-04-10 10:00:00');
    order.endAt = new Date('2020-04-10 12:00:00');
    order.seatId = 1;

    return { data: order };
  }
}