import { testConn } from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";
import { Connection, getConnection } from "typeorm";
import faker from "faker";
import moment from "moment";
import { Seat } from "../../src/entity/Seat";
import { Order } from "../../src/entity/Order";
import { CreateOrderInput, OrderInput } from "../../src/server/resolvers/order.resolver";
import { encrypt } from "../../utils/password";

describe('order.resolver.ts', () => {
  let conn: Connection;
  let seatId: number;

  const seatData = {
    seatNumber: faker.random.uuid(),
    seatPassword: faker.random.uuid(),
  };

  const createOrderInput: CreateOrderInput = {
    ...seatData,
    password: faker.random.uuid(),
    startAt: moment().add(1, 'day').millisecond(0).toDate(),
    endAt: moment().add(3, 'days').millisecond(0).toDate(),
  };

  const deleteOrderInput: OrderInput = {
    ...seatData,
    password: createOrderInput.password,
  };

  const createOrderMutation: string = `
    mutation Order($args: CreateOrderInput!) {
      createOrder(args: $args) {
        id
        startAt
        endAt
        seatId
      }
    }
  `;

  const deleteOrderMutation: string = `
    mutation Order($args: OrderInput!) {
      deleteOrder(args: $args) {
        id
        startAt
        endAt
        seatId
      }
    }
  `;

  beforeAll(async () => {
    conn = await testConn();

    const seatInsertResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Seat)
      .values({
        ...seatData,
        seatPassword: await encrypt(seatData.seatPassword),
      })
      .execute();

    seatId = seatInsertResult.identifiers[0].id;
  });

  afterAll(async () => {
    await Seat.delete({ id: seatId });
    await conn.close();
  });

  describe('createOrder', () => {
    test('should success to create order.', async () => {
      const res = await gCall({
        source: createOrderMutation,
        variableValues: {
          args: createOrderInput,
        },
      });

      expect(res.data.createOrder).toMatchObject({
        startAt: createOrderInput.startAt.toISOString(),
        endAt: createOrderInput.endAt.toISOString(),
        seatId,
      });

      const id = res.data.createOrder.id;
      await Order.delete({ id });
    });

    test('should fail to create order when startAt is before now.', async () => {
      const res = await gCall({
        source: createOrderMutation,
        variableValues: {
          args: {
            ...createOrderInput,
            startAt: moment().subtract(1, 'minute').toDate(),
          },
        },
      });

      expect(res.errors[0].message).toBe('Invalid startAt.');
    });

    test('should fail to create order when endAt is before or equal to startAt.', async () => {
      const res = await gCall({
        source: createOrderMutation,
        variableValues: {
          args: {
            ...createOrderInput,
            endAt: createOrderInput.startAt,
          },
        },
      });

      expect(res.errors[0].message).toBe('Invalid endAt.');
    });

    test('should fail to create order with invalid seat data.', async () => {
      const res = await gCall({
        source: createOrderMutation,
        variableValues: {
          args: {
            ...createOrderInput,
            seatNumber: seatData.seatNumber + "1",
          },
        },
      });

      expect(res.errors[0].message).toBe('No such seat data.');
    });

    test('should fail to create order if there is order already.', async () => {
      const alreadyExistedOrder = await Order.create({
        password: faker.random.uuid(),
        startAt: moment().add(2, 'day').millisecond(0).toDate(),
        endAt: moment().add(4, 'days').millisecond(0).toDate(),
        seatId,
      }).save();

      const res = await gCall({
        source: createOrderMutation,
        variableValues: {
          args: createOrderInput,
        },
      });

      expect(res.errors[0].message).toBe('Currently in use.');

      await Order.delete({ id: alreadyExistedOrder.id });
    });
  });

  describe('deleteOrder', () => {
    let order: Order;

    beforeAll(async () => {
      order = await Order.create({
        ...createOrderInput,
        password: await encrypt(createOrderInput.password),
        seatId,
      }).save();
    });

    afterAll(async () => {
      await Order.delete({ id: order.id });
    });

    test('should success to delete order.', async () => {
      const res = await gCall({
        source: deleteOrderMutation,
        variableValues: {
          args: deleteOrderInput,
        },
      });

      expect(res.data.deleteOrder).toMatchObject({
        startAt: createOrderInput.startAt.toISOString(),
        endAt: createOrderInput.endAt.toISOString(),
        seatId,
      });

      order = await Order.create({
        ...createOrderInput,
        password: await encrypt(createOrderInput.password),
        seatId,
      }).save();
    });

    test('should fail to delete order if there is no order.', async () => {
      const alreadyExistedOrder = await Order.findOne({
        id: order.id,
      });

      if (alreadyExistedOrder)
        await Order.delete({ id: order.id });

      const res = await gCall({
        source: deleteOrderMutation,
        variableValues: {
          args: deleteOrderInput,
        },
      });

      expect(res.errors[0].message).toBe('No such order.');

      order = await Order.create({
        ...createOrderInput,
        password: await encrypt(createOrderInput.password),
        seatId,
      }).save();
    });

    test('should fail to delete order with invalid seatNumber.', async () => {
      const res = await gCall({
        source: deleteOrderMutation,
        variableValues: {
          args: {
            ...deleteOrderInput,
            seatNumber: deleteOrderInput.seatNumber + '1',
          },
        },
      });

      expect(res.errors[0].message).toBe('No such seat data.');
    });

    test('should fail to delete order with invalid seatPassword.', async () => {
      const res = await gCall({
        source: deleteOrderMutation,
        variableValues: {
          args: {
            ...deleteOrderInput,
            seatPassword: deleteOrderInput.seatPassword + '1',
          },
        },
      });

      expect(res.errors[0].message).toBe('Invalid seat password.');
    });

    test('should fail to delete order with invalid password.', async () => {
      const res = await gCall({
        source: deleteOrderMutation,
        variableValues: {
          args: {
            ...deleteOrderInput,
            password: deleteOrderInput.password + '1',
          },
        },
      });

      expect(res.errors[0].message).toBe('Invalid password.');
    });
  });
});
