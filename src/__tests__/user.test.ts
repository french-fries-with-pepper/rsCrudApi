/* describe("first test", () => {
    it("should return true",()=>{
        expect(true).toBe(true);
    })
}) */

import request from "supertest";
import { server } from "../index";

describe("Scenario 1", () => {
  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const sendUser = {
      username: "kamran",
      age: 26,
      hobbies: ["1", "2"],
    };
    const res = await request(server).post("/api/users").send(sendUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(sendUser);
  });
});
/* describe("scenario 2", () => {
  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const sendUser = {
      username: "kamran",
      age: 26,
      hobbies: ["1", "2"],
    };
    const res = await request(server).post("/api/users").send(sendUser);

    expect(res.statusCode).toBe(201);
    const recivedUser = JSON.parse(res.text);
    expect(recivedUser).toMatchObject(sendUser);
  });
}); */
