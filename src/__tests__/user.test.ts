import User from "../models/UserInterface";
import { v4 } from "uuid";

import request from "supertest";
import { server } from "../index";

describe("Scenario 1, \nempty->add user->get user->update user->delete user->get user->empty", () => {
  const sendingUser: User = {
    username: "August",
    age: 26,
    hobbies: ["1", "2"],
  };
  const updatedUser: User = {
    username: "Benito",
    age: 26,
    hobbies: ["1", "2"],
  };
  let sendingUserId: string;

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res = await request(server).post("/api/users").send(sendingUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(sendingUser);
    sendingUserId = res.body.id;
  });
  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const res = await request(server).get(`/api/users/${sendingUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(sendingUser);
  });
  it("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const res = await request(server)
      .put(`/api/users/${sendingUserId}`)
      .send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(updatedUser);
    expect(res.body.id).toBe(sendingUserId);
  });
  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res = await request(server).delete(`/api/users/${sendingUserId}`);
    expect(res.status).toBe(204);
  });
  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const res = await request(server).get(`/api/users/${sendingUserId}`);
    expect(res.statusCode).toBe(404);
  });
  it("Get all records with a GET api/users request (an empty array is expected, we remove the one user)", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("Scenario 2, error handling", () => {
  const sendingUser: User = {
    username: "August",
    age: 26,
    hobbies: ["1", "2"],
  };
  const nonFullUser = {
    age: 18,
  };
  it("With a GET api/user/{unExistUser uuid} request, we try to get 404 response code", async () => {
    const res = await request(server).get(`/api/users/${v4()}`);
    expect(res.statusCode).toBe(404);
  });
  it("With a GET api/user/{unExistUser not uuid} request, we try to get 400 response code and error message", async () => {
    const res = await request(server).get(`/api/users/non-uuid-i_am-shure`);
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toEqual(expect.anything());
  });
  it("POST api/users request with non-JSON data (wait for server error 500 with msg)", async () => {
    const res = await request(server).post("/api/users").send("Non-JSOM-data");
    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toEqual(expect.anything());
  });

  it("POST api/users request with non-USER type data (wait for error code 400 with msg)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send(JSON.stringify(nonFullUser));
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toEqual(expect.anything());
  });

  it("With a DELETE api/user/{unExistUser not uuid} request, we try to get 400 response code and error message", async () => {
    const res = await request(server).delete(`/api/users/non-uuid-i_am-shure`);
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toEqual(expect.anything());
  });
  it("With a PUT api/user/{unExistUser uuid} request, we try to get 404 response code and error message", async () => {
    const res = await request(server)
      .put(`/api/users/${v4()}`)
      .send(sendingUser);
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toEqual(expect.anything());
  });
});
