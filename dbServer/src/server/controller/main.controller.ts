import { Application, Request, Response } from "express";

export class Controller {
  constructor(private app: Application) {
    this.routes();
  }

  private routes() {
    this.app.get("/", (_: Request, res: Response) => {
      res.send("Hello, World!");
    });
  }
}
