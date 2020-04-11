import { Resolver, InputType, Field, Arg, Query } from "type-graphql";
import { Order } from "../../entity/Order";

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
}
