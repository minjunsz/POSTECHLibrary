import { buildSchema } from "type-graphql";
import { SeatResolver } from "../src/server/resolvers/seat.resolver";
import { OrderResolver } from "../src/server/resolvers/order.resolver";
import { SeatConditionResolver } from "../src/server/resolvers/seatCondition.resolver";

export const createShema = async () => {
  try {
    return await buildSchema({
      resolvers: [
        SeatResolver,
        OrderResolver,
        SeatConditionResolver
      ],
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};