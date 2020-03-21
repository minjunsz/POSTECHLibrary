import express from "express";
// import badyParser from "body-parser";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }
}

export default new App().app;
