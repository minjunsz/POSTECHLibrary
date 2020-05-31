import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { Seat } from "./Seat";

enum Status {
  UNAVAILABLE = "UNAVAILABLE",
  UNCOMFORTABLE = "UNCOMFORTABLE",
  UNSANITARY = "UNSANITARY",
}

registerEnumType(Status, {
  name: "Status",
  description: "Status of seat",
});

@ObjectType()
@Entity()
export class SeatCondition {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Status)
  @Column({ type: "enum", enum: Status })
  status: Status;

  @Field()
  @Column({ type: "varchar" })
  description: String;

  @Field(() => Int)
  @Column({ type: "int" , default: null, nullable: true })
  seatId: number;

  @OneToOne(() => Seat, seat => seat.seatCondition)
  @JoinColumn({ name: "seatId" })
  seat: Seat;

}

