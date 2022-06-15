import { runTest } from "./utils/test.js";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(404, { contentType: "application/json" });
  res.end(JSON.stringify({ message: "Unknown route" }));
});
console.log("Starting  ...");
runTest("After");
const PORT = process.env.PORT || 3000;
server.listen(PORT);
