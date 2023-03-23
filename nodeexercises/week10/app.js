import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));

let httpServer = http.createServer(app);

app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));

//street
const streetLights = [
  { streetName: "Farah", green: 1000, red: 700, yellow: 500 },
  { streetName: "Teima", green: 5000, red: 3000, yellow: 2000 },
  { streetName: "Info3139", green: 8000, red: 400, yellow: 1000 },
];

// Socket.io server
const io = new Server(httpServer, {});
// main socket routine
io.on("connection", (socket) => {
  console.log("new connection established");
  // client has joined
  socket.on("join", (client) => {
    //socket.name = client.name;
    // use the room property to create a room
    socket.join(client.room);
    console.log(`client has joined ${client.room}`);
    // send message to joining client
    socket.emit(
      "turnLampOn",
      streetLights.find((s) => s.streetName === client.room)
    );
    // send message to rest of the room the client just joined
    socket
      .to(client.room)
      .emit("newclient", `${socket.name} has joined this room`);
  });
});
const getNumberOfUsersInRoom = (roomName) =>
  io.sockets.adapter.rooms.get(roomName).size;

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
