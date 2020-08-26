import { Order } from "../../entity/Order";
import { isAuth } from "../../middleware/isAuth";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware, ObjectType } from "type-graphql";
import { SeatCondition, SeatStatus } from "../../entity/SeatCondition";
import { MyContext } from "../types";
import { getConnection } from "typeorm";

@InputType()
class ConditionInput {
  @Field()
  status!: SeatStatus;

  @Field()
  description?: String;
};

@ObjectType()
class SeatConditionResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => SeatCondition, { nullable: true })
  seatCondition?: SeatCondition
}

@Resolver()
export class SeatConditionResolver {
  @Query(() => SeatConditionResponse)
  async seatCondition(
    @Arg('seatId') seatId: number
  ): Promise<SeatConditionResponse> {
    const condition = await SeatCondition.findOne({ where: { seatId } })
    if (!condition) {
      return { error: "Cannot find Seat Condition" };
    } else {
      return { seatCondition: condition }
    }
  }

  @Mutation(() => SeatCondition)
  @UseMiddleware(isAuth)
  async createSeatCondition(
    @Arg('conditions') conditions: ConditionInput,
    @Ctx() { req }: MyContext
  ): Promise<SeatCondition | undefined> {
    const order = await Order.findOne(req.session.orderId);
    const seatConditionResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(SeatCondition)
      .values({
        ...conditions,
        seatId: order?.seatId
      })
      .execute();
    return await SeatCondition.findOne(seatConditionResult.identifiers[0].id);
  }
}