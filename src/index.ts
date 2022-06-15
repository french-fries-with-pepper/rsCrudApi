import http from "http";
import UserController from "./controllers/userController.js";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    UserController.getUsers(res);
  } else if (req.url === "/api/users" && req.method === "POST") {
    UserController.addUser(req, res);
  } else {
    res.writeHead(404, { contentType: "application/json" });
    res.end(JSON.stringify({ message: "Unknown route" }));
  }
});
console.log("Starting  ...");
const PORT = process.env.PORT || 3000;
server.listen(PORT);
