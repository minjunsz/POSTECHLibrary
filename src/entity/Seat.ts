import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
 } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class Seat {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    seatNumber: string;

    @Field()
    @Column()
    seatPassword: string;

    @OneToMany(() => Order, order => order.seat)
    orders: [Order];
}
