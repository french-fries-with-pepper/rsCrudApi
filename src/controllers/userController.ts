import http from "http";
import User from "../models/UserInterface";
import {
  getAllUsers,
  addNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../models/userModel";
import isUuid from "../utils/isUuid";
export default class UserController {
  // Route /api/users
  // Method GET
  public static getUsers(res: http.ServerResponse): void {
    res.writeHead(200, { "content-type": "application/json" });
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
      let user;
      try {
        user = JSON.parse(body);
      } catch {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ msg: "Error! Can't parse JSON from request." })
        );
      }
      addNewUser(user)
        .then((result) => {
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(result));
        })
        .catch((err) => {
          res.writeHead(400, { "content-type": "application/json" });
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
      res.writeHead(200, { "content-type": "application/json" });
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
        let newUserData;
        try {
          newUserData = JSON.parse(body);
        } catch {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(
            JSON.stringify({ msg: "Error! Can't parse JSON from request." })
          );
        }
        let newUser: User;
        try {
          newUser = new User(
            newUserData.username,
            newUserData.age,
            newUserData.hobbies
          );
          updateUserById(id, newUser).then((user) => {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(user));
          });
        } catch (err) {
          res.writeHead(400, { "content-type": "application/json" });
          let errorMsg: string;
          if (err instanceof Error) {
            errorMsg = err.message;
          } else {
            errorMsg = "Invalid object!";
          }
          res.end(JSON.stringify({ msg: errorMsg }));
        }
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
    this.isUserExist(res, id).then(() => {
      deleteUserById(id).then(() => {
        res.writeHead(204, { "content-type": "application/json" });
        res.end();
      });
    });
  }

  static isUserExist(res: http.ServerResponse, id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!isUuid(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "Recived user id is not a valid uuid" }));
      }
      getUserById(id)
        .then((user) => resolve(user))
        .catch(() => {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ msg: "Recived user id not found" }));
        });
    });
  }
}
