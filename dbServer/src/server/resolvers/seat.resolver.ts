import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { encrypt } from "../../../utils/password";
import { Seat, SeatType } from "../../entity/Seat";

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
    @Arg('floor', () => Int!) floor: number,
    @Arg('needOutlet') needOutlet: boolean,
    @Arg('seatType', () => [SeatType]) seatType: SeatType[],
  ): Promise<Seat[]> {
    const qb = getConnection()
      .getRepository(Seat)
      .createQueryBuilder('seats')
      .leftJoinAndSelect("seats.seatCondition", "seatCondition")
      .leftJoinAndSelect("seats.order", "order")
      .orderBy('seats.id')
      .where('floor = :floor', { floor });
    needOutlet ? qb.andWhere('seats.hasOutlet = true') : null;
    !!seatType.length ? qb.andWhere('seats.seatType IN (:seatType)', { seatType }) : null;

    return qb.getMany();
  }

  @Query(() => Seat)
  async seat(
    @Arg('seatId', () => Int) seatId: number,
  ): Promise<Seat> {
    const qb = getConnection()
      .getRepository(Seat)
      .createQueryBuilder('seat')
      .leftJoinAndSelect("seat.seatCondition", "seatCondition")
      .whereInIds(seatId)
    const result = await qb.getOne();
    if (!result) { throw new Error("not Authenticated"); }
    return result;
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