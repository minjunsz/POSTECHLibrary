import { Resolver, InputType, Field, Arg, Mutation, Query } from "type-graphql";
import { Seat } from "../../entity/Seat";
import { getConnection } from "typeorm";
import { encrypt } from "../../../utils/password";

@InputType()
class SeatInput {
  @Field()
  seatNumber: string;

  @Field()
  seatPassword: string;
};

@Resolver()
export class SeatResolver {
  @Query(() => [Seat])
  async seats(): Promise<Seat[]> {
    return Seat.find();
  }

  @Mutation(() => Seat)
  async createSeat(@Arg('args') args: SeatInput) {
    const alreadyExistedSeat = await Seat.findOne({
      seatNumber: args.seatNumber,
    });

    if (alreadyExistedSeat)
      return new Error('Duplicated seatNumber.');

    const seatResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Seat)
      .values({
        ...args,
        seatPassword: await encrypt(args.seatPassword),
      })
      .execute();

    return await Seat.findOne(seatResult.identifiers[0].id);
  }
};