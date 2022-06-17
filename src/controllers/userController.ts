import http from "http";
import User from "../models/UserInterface.js";
import {
  getAllUsers,
  addNewUser,
  getUserById,
  updateUserById,
} from "../models/userModel.js";
import isUuid from "../utils/isUuid.js";
export default class UserController {
  // Route /api/users
  // Method GET
  public static getUsers(res: http.ServerResponse): void {
    res.writeHead(200, { contentType: "application/json" });
    res.end(JSON.stringify(getAllUsers()));
  }

  // Route /api/users
  // Method POST
  public static addUser(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): void {
    let body = "";
    req.on("data", (data: any) => {
      body += data.toString();
    });
    req.on("end", () => {
      const user = JSON.parse(body);
      addNewUser(user)
        .then((result) => {
          res.writeHead(201, { contentType: "application/json" });
          res.end(JSON.stringify(result));
        })
        .catch((err) => {
          res.writeHead(400, { contentType: "application/json" });
          res.end(JSON.stringify({ msg: err.message }));
        });
    });
  }

  // Route /api/users/:id
  // Method GET
  public static getUser(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string
  ): void {
    this.isUserExist(res, id).then((user) => {
      res.writeHead(200, { contentType: "application/json" });
      res.end(JSON.stringify(user));
    });
  }

  // Route /api/users/:id
  // Method PUT
  public static updateUser(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string
  ): void {
    this.isUserExist(res, id).then(() => {
      let body = "";
      req.on("data", (data: any) => {
        body += data.toString();
      });
      req.on("end", () => {
        const newUser = JSON.parse(body);
        updateUserById(id, newUser).then((user) => {
          res.writeHead(200, { contentType: "application/json" });
          res.end(JSON.stringify(user));
        });
      });
    });
  }

  // Route /api/users/:id
  // Method DELETE
  public static deleteUser(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string
  ): void {
    this.isUserExist(res, id).then((user) => {});
  }

  static isUserExist(res: http.ServerResponse, id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!isUuid(id)) {
        res.writeHead(400, { contentType: "application/json" });
        res.end(JSON.stringify({ msg: "Recived user id is not a valid uuid" }));
      }
      getUserById(id)
        .then((user) => resolve(user))
        .catch(() => {
          res.writeHead(404, { contentType: "application/json" });
          res.end(JSON.stringify({ msg: "Recived user id not found" }));
        });
    });
  }
}
