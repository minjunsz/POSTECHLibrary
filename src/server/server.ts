import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import app from "./app";
import { PORT } from "./constants";
import { buildSchema } from "type-graphql";
import { SeatResolver } from "./resolvers/order.resolver";

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ SeatResolver ]
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
   });
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
