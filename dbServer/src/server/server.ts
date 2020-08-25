import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import app, { redisClient } from "./app";
import { PORT, __prod__ } from "./constants";
import { createShema } from "../../utils/createSchema";
import { isDBReady } from "../../utils/checkDependency";
import sleep from "../../utils/sleep";

import moment from "moment"
import "moment-timezone"
moment.tz.setDefault("Asia/Seoul");

(async () => {
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, {
    synchronize: !__prod__,
    logging: !__prod__
  });

  console.log("Waiting for DB connection")
  while (!await isDBReady()) {
    await sleep(1000);
  }
  console.log("Database connection ready");

  await createConnection(connectionOptions)
    .catch(error => console.log("connection error: " + error));

  const schema = await createShema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
