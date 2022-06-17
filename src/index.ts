import http from "http";
import UserController from "./controllers/userController.js";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer((req, res) => {
  let idUrlPart: string;
  if (req.url) {
    const arr = req.url.split("/");
    idUrlPart = arr[arr.length - 1];
  } else {
    idUrlPart = "";
  }
  if (req.url === "/api/users" && req.method === "GET") {
    UserController.getUsers(res);
  } else if (req.url === "/api/users" && req.method === "POST") {
    UserController.addUser(req, res);
  } else if (
    req.url?.startsWith("/api/users") &&
    req.method === "GET" &&
    idUrlPart
  ) {
    UserController.getUser(req, res, idUrlPart);
  } else if (
    req.url?.startsWith("/api/users") &&
    req.method === "PUT" &&
    idUrlPart
  ) {
    UserController.updateUser(req, res, idUrlPart);
  } else if (
    req.url?.startsWith("/api/users") &&
    req.method === "DELETE" &&
    idUrlPart
  ) {
    UserController.deleteUser(req, res, idUrlPart);
  } else {
    res.writeHead(404, { contentType: "application/json" });
    res.end(JSON.stringify({ message: "Unknown route" }));
  }
});
const port = process.env.port || 3000;
server.listen(port);
console.log("Swrver working on port " + port);
