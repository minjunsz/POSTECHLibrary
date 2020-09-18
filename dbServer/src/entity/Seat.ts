import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
} from "typeorm";
import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { Order } from "./Order";
import { SeatCondition } from "./SeatCondition";

export enum SeatType {
    A = "A",
    B = "B",
    C = "C"
}

registerEnumType(SeatType, {
    name: "SeatType",
    description: "Type of Seats",
});

@ObjectType()
@Entity()
export class Seat extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seatPassword: string;

    @Field(() => Int)
    @Column()
    floor: number

    @Field()
    @Column({ type: "float" })
    xpos: number

    @Field()
    @Column({ type: "float" })
    ypos: number

    @Field(() => SeatType)
    @Column({ type: "enum", enum: SeatType })
    seatType: SeatType;

    @Field()
    @Column()
    hasOutlet: boolean

    @Field({ nullable: true })
    @OneToOne(() => Order, order => order.seat, { nullable: true })
    order?: Order;

    @Field({ nullable: true })
    @OneToOne(() => SeatCondition, seatCondition => seatCondition.seat, { nullable: true })
    seatCondition?: SeatCondition;
}
