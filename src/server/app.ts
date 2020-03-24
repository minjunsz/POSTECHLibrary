import express from "express";
import bodyParser from "body-parser";
import "./passport.ts";
import CookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Controller } from "./controller/main.controller";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.SetConfig();
    new Controller(this.app);
  }

  private SetConfig() {
    this.app.use(CookieParser());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(
      session({
        secret: "Minjun Genius",
        resave: false,
        saveUninitialized: false
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}

export default new App().app;
