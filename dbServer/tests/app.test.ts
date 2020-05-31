import request from "supertest";
import app from "../src/server/app";
import { Server } from "http";

describe("Test the root path", () => {
  let server: Server;
  beforeAll(async () => {
    server = await app.listen(8000, () =>
      console.log(`Listening on port ${8000}`)
    );
  });

  afterAll(() => {
    console.log("closing...");
    server.close();
  });

  test("It should response the GET method", async done => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    done();
  });
});
