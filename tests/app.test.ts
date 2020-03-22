import request from "supertest";
import app from "../src/server/app";
import { Server } from "http";

describe("Test the root path", () => {
  let server: Server;
  beforeAll(async () => {
    server = await app.listen(3000, () =>
      console.log(`Listening on port ${3000}`)
    );
  });

  afterAll(() => {
    console.log("closing...");
    server.close();
  });

  test("root GET", async done => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toMatch("Hello, World!");
    done();
  });
  test("wrong url GET", async done => {
    const response = await request(app).get("/wrong-url");
    expect(response.status).toBe(404);
    done();
  });
});
