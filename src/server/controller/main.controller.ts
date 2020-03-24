import { Application, Request, Response } from "express";
import { LoginController, isAuthenticated } from "./login.controller";

export class Controller {
  constructor(private app: Application) {
    this.routes();
    new LoginController(this.app);
  }

  private routes() {
    this.app.get("/", isAuthenticated, (_: Request, res: Response) => {
      res.send("Hello, World!");
    });
  }
}
