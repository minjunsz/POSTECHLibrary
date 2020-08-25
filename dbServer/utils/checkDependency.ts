import mysql from "mysql";
import dbOptions from "../ormconfig.json";

export function isDBReady(): Promise<boolean> {
  const connection = mysql.createConnection({
    host: dbOptions.host,
    user: dbOptions.username,
    password: dbOptions.password,
  })
  return new Promise((ok) => {
    connection.ping((err) => {
      connection.destroy();
      if (err) {
        ok(false);
      }
      ok(true);
    })
  })
}

// How to wait until DB is Ready 
//
// import sleep from "./sleep";
// (async () => {
//   while (!await isDBReady()) {
//     await sleep(1000);
//     console.log("not yet");
//   }
//   console.log("ready");
// })();