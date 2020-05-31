import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    "type": "mysql",
    "host": "db",
    "port": 3306,
    "username": "root",
    "password": "1234",
    "database": "testdb",
    "synchronize": true,
    "dropSchema": drop,
    "entities": [
        __dirname + "/../../src/entity/**/*.ts"
    ],
  })
}