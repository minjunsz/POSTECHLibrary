import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Seat } from "./Seat";

@ObjectType()
@Entity()
export class Order extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Field()
  @Column()
  startAt: Date;

  @Field()
  @Column()
  endAt: Date;

  @Field(() => Int)
  @Column({ type: "int" })
  seatId: number;

  @OneToOne(() => Seat, seat => seat.order)
  @JoinColumn({ name: "seatId" })
  seat: Seat;

}
