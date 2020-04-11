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

  //@Field()
  @Column()
  password: string;

  @Field()
  @Column()
  startAt: Date;

  @Field()
  @Column()
  endAt: Date;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int" , default: null, nullable: true })
  seatId: number;

  @OneToOne(() => Seat, seat => seat.order)
  @JoinColumn({ name: "seatId" })
  seat: Seat;

}
