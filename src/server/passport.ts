import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import { Request } from "express";
import "./user.ts";
import mockUser from "./user";

//TODO: replace mockUser & connect DB
passport.serializeUser((user, done) => {
  console.log("serializerUser", user);
  done(null, mockUser[0].id);
});

passport.deserializeUser(function(id, done) {
  // connection.query('SELECT * FROM users WHERE `id`=?', [id], function(err, rows){
  //   var user = rows[0];
  //   done(err,user);
  // });
  console.log("deserializeUser", id);
  done(null, id);
  // login 처리
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true,
      passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
    },
    function(
      _: Request,
      userid: string,
      password: string,
      done: (error: any, user?: any) => void
    ) {
      if (userid === "minjun" && password === "minjunGod") {
        return done(null, mockUser);
      } else {
        return done(null, false);
      }
    }
  )
);
