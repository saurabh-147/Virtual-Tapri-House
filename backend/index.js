const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 7000;

const authroutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const officeRoutes = require("./routes/office");
const { getAllMessage, postMessage, getUserName } = require("./routes/chat");

const app = express();
let server = http.createServer(app);
const io = socketio(server);

//...........................Mongoose Connection.................//
mongoose.connect("mongodb+srv://admin-saurabh147:hLB8T2FKpph2gCLV@cluster0.wkt04.mongodb.net/letsMeet?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting to the db", err);
});

//............................................................//

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

io.on("connection", (socket) => {
  socket.on("join", async ({ chatId, userId }, callback) => {
    var messages = [];
    await getAllMessage(chatId).then((data) => {
      messages = data.messages;
    });
    var username = "";
    await getUserName(userId).then((data) => {
      username = data.name;
    });

    socket.join(chatId);

    callback(messages);
  });

  //user generated message
  socket.on("sendMessage", async ({ message, chatId, userId }, callback) => {
    var message;
    await postMessage(chatId, userId, message).then((data) => {
      message = data.lastMessage;
    });

    await io.to(chatId).emit("message", message);

    await callback("Messgage Stored");
  });

  socket.on("disconnect", () => {
    console.log("User has left the meeting ,Page Reload");
  });
});

//middlewares
app.use("/api", authroutes);
app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", officeRoutes);

server.listen(7000, () => {
  console.log("Server started at port 7000");
});
