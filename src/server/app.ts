import express from "express";
// import badyParser from "body-parser";
import { Controller } from "./controller/main.controller";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    new Controller(this.app);
  }
}

export default new App().app;
