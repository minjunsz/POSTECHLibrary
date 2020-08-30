import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { SeatCondition, SeatStatus } from "../../entity/SeatCondition";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class ConditionInput {
  @Field(() => Int)
  seatId!: number;
  @Field()
  status!: SeatStatus;
  @Field({ nullable: true })
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
    @Arg('seatId', () => Int) seatId: number
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
    @Ctx() _: MyContext
  ): Promise<SeatCondition | undefined> {
    // TODO: check whether this user is owner of this seat or not
    const seatConditionResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(SeatCondition)
      .values({
        ...conditions,
        seatId: conditions.seatId
      })
      .execute();
    return await SeatCondition.findOne(seatConditionResult.identifiers[0].id);
  }
}