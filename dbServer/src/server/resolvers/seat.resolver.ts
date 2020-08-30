import { Resolver, InputType, Field, Arg, Mutation, Query, Int } from "type-graphql";
import { Seat, SeatType } from "../../entity/Seat";
import { getConnection } from "typeorm";
import { encrypt } from "../../../utils/password";

@InputType()
class SeatInput {
  @Field()
  seatPassword: string;
  @Field(() => Int)
  floor: number;
  @Field()
  xpos: number;
  @Field()
  ypos: number;
  @Field()
  seatType: SeatType
  @Field()
  hasOutlet: boolean;
};

@Resolver()
export class SeatResolver {
  @Query(() => [Seat])
  async seats(
    @Arg('limit', () => Int) limit: number,
    @Arg('floor', () => Int, { nullable: true }) floor: number | null,
    @Arg('cursor', () => Int, { nullable: true }) cursor: number | null
  ): Promise<Seat[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Seat)
      .createQueryBuilder('seats')
      .leftJoinAndSelect("seats.seatCondition", "seatCondition")
      .orderBy('seats.id')
      .take(realLimit)
    if (floor) {
      qb.where('floor = :floor', { floor });
    }
    if (cursor) {
      floor ? qb.andWhere('seats.id >= :cursor', { cursor }) : qb.where('seats.id >= :cursor', { cursor });
    }

    return qb.getMany();
  }

  @Mutation(() => Seat)
  async createSeat(@Arg('args') args: SeatInput) {
    const seatResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Seat)
      .values({
        ...args,
        seatPassword: await encrypt(args.seatPassword),
      })
      .execute();

    console.log(seatResult.identifiers[0]);
    return await Seat.findOne(seatResult.identifiers[0].id);
  }
};