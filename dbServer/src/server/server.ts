import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import app from "./app";
import { PORT } from "./constants";
import { createShema } from "../../utils/createSchema";

(async () => {
  await createConnection().then(async () => {
    console.log("Inserting a new user into the database...");
  }).catch(error => console.log("connection error: " + error));

  const schema = await createShema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
   });

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
