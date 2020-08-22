import express from "express";
import bodyParser from "body-parser";
import { Controller } from "./controller/main.controller";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import { __prod__, REDIS_HOST, REDIS_PORT, COOKIE_NAME } from "./constants";

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth_pass: "1234" //TODO: move password to .env file
});

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.SetConfig();
    new Controller(this.app);
  }

  private SetConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({
          client: redisClient,
          disableTouch: true
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          secure: __prod__,
          sameSite: "lax"
        },
        secret: "TODO: insert_random_secret_value",
        resave: false,
        saveUninitialized: false
      })
    )
  }
}

export default new App().app;
