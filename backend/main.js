const express = require("express");
const cors = require('cors');
require("./db/db.js");
require("dotenv").config();

const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });

app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
// import Routers
const adminRouter=require("./Admin/router/AdminRouter");
const userRouter=require("./routers/routes/user");
const loginRouter=require("./routers/routes/login");
const carRouter =require("./routers/routes/car")
const reservationRouter=require("./routers/routes/reservation")
const rateRouter=require("./routers/routes/rate");

// Routers
app.use("/admin",adminRouter);
app.use("/login",loginRouter);
app.use("/users",userRouter);
app.use("/car",carRouter)
app.use("/reserve",reservationRouter);
app.use("/rate",rateRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// setting up the connection
io.on("connection", (socket) => {
  // `socket.id` is the id assigned to the user that connected
  console.log(`${socket.id} is connected`);
  
  socket.on("disconnect", (socket) => {
    console.log(`${socket.id} is disconnected`);
  })
});