import http from "http";
import { getAllUsers, addNewUser } from "../models/userModel.js";

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
}
