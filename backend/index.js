const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 7000;

const authroutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const officeRoutes = require("./routes/office");

const app = express();

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

//middlewares
app.use("/api", authroutes);
app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", officeRoutes);

app.listen(7000, () => {
  console.log("Server started a port 7000");
});
