import { Application, Request, Response, NextFunction } from "express";
import passport from "passport";

export class LoginController {
  constructor(private app: Application) {
    this.routes();
  }

  private routes() {
    this.app.post(
      "/login",
      passport.authenticate("local", {
        failureRedirect: "/"
      }),
      (_: Request, res: Response) => {
        res.redirect("/");
      }
    );

    this.app.get("/logout", function(req: Request, res: Response) {
      req.session!.destroy((err: Error) => {
        if (err) {
          console.log(err);
          res.send("session is not destroyed");
        } else {
          console.log("session destroy sucess...");
          res.send("session is destoryed (login please)");
        }
      });
    });
  }
}

export const isAuthenticated = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) return next();
  res.send("not login... login please!!");
};
