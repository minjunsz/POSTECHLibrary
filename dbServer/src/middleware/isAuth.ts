import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/server/types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.orderId) {
    throw new Error("not Authenticated");
  }
  return next();
}