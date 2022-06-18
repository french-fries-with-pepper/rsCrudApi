import cluster from "cluster";
import { cpus } from "os";
const numCPUs = cpus().length;

import http from "http";
import UserController from "./controllers/userController";
import dotenv from "dotenv";
dotenv.config();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

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

  console.log(`Worker ${process.pid} started`);
}
