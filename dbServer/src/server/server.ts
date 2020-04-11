import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import app from "./app";
import { PORT } from "./constants";
import { buildSchema } from "type-graphql";
import { OrderResolver } from "./resolvers/order.resolver";

(async () => {
  await createConnection("librarydb").then(async () => {
    console.log("Inserting a new user into the database...");
  }).catch(error => console.log("connection error: " + error));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ OrderResolver ]
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
   });

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
