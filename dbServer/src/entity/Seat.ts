import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
 } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Order } from "./Order";
import { SeatCondition } from "./SeatCondition";

@ObjectType()
@Entity()
export class Seat extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    seatNumber: string;

    @Column()
    seatPassword: string;

    @OneToOne(() => Order, order => order.seat)
    order: Order;

    @OneToOne(() => SeatCondition, seatCondition => seatCondition.seat)
    seatCondition: SeatCondition;
}
