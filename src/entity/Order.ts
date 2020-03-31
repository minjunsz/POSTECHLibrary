import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Seat } from "./Seat";

@ObjectType()
@Entity()
export class Order {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  startAt: Date;

  @Field()
  @Column()
  endAt: Date;

  @Field(() => Int, { nullable: true })
  seatId: number;

  @ManyToOne(() => Seat, seat => seat.orders)
  seat: Seat;

}
