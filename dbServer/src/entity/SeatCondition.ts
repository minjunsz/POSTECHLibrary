import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { Seat } from "./Seat";

export enum SeatStatus {
  FINE = "FINE",
  UNAVAILABLE = "UNAVAILABLE",
  UNCOMFORTABLE = "UNCOMFORTABLE",
  UNSANITARY = "UNSANITARY",
}

registerEnumType(SeatStatus, {
  name: "SeatStatus",
  description: "Status of seat",
});

@ObjectType()
@Entity()
export class SeatCondition extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => SeatStatus)
  @Column({ type: "enum", enum: SeatStatus })
  status: SeatStatus;

  @Field()
  @Column({ type: "varchar" })
  description: String;

  @Field(() => Int)
  @Column({ type: "int" })
  seatId: number;

  @OneToOne(() => Seat, seat => seat.seatCondition)
  @JoinColumn({ name: "seatId" })
  seat: Seat;

}

