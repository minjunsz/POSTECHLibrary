import express from "express";
import bodyParser from "body-parser";
import { Controller } from "./controller/main.controller";

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
  }
}

export default new App().app;
