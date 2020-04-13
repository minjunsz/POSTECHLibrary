import { testConn } from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";
import { Connection } from "typeorm";
import faker from "faker";
import { Seat } from "../../src/entity/Seat";

describe('seat.resolver.ts', () => {
  let conn: Connection;

  const seatInput = {
    seatNumber: faker.random.uuid(),
    seatPassword: faker.random.uuid(),
  };

  const createSeatMutation = `
    mutation Seat($args: SeatInput!) {
      createSeat(args: $args) {
        id
        seatNumber
      }
    }
  `;

  beforeAll(async () => {
    conn = await testConn();
  });

  afterAll(async () => {
    await conn.close();
  });

  describe('createSeat', () => {
    test('should success to create seat.', async () => {
      const res = await gCall({
        source: createSeatMutation,
        variableValues: {
          args: seatInput,
        },
      });

      expect(res.data.createSeat).toMatchObject({
        seatNumber: seatInput.seatNumber,
      });

      const id = res.data.createSeat.id;

      await Seat.delete({ id });
    });

    test('should fail to create seat with duplicated seatNumber.', async () => {
      const alreadyExistedSeat = await Seat.create({
        seatNumber: "1",
        seatPassword: "123",
      }).save();

      const res = await gCall({
        source: createSeatMutation,
        variableValues: {
          args: {
            seatNumber: alreadyExistedSeat.seatNumber,
            seatPassword: alreadyExistedSeat.seatPassword,
          },
        },
      });

      expect(res.errors[0].message).toBe('Duplicated seatNumber.');

      await Seat.delete({ id: alreadyExistedSeat.id });
    });
  });
});