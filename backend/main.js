const express = require("express");
const cors = require("cors");
require("./db/db.js");
require("dotenv").config();
const twilio = require("twilio")

const accountSid  = "ACb89581a8b196a35127df754f7faa725b"
const authToken = "a47003ca0903be1ad382812fc661496c"
const client = new twilio(accountSid, authToken);


const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });

app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
// import Routers
const adminRouter = require("./Admin/router/AdminRouter");
const userRouter = require("./routers/routes/user");
const loginRouter = require("./routers/routes/login");
const carRouter = require("./routers/routes/car");
const reservationRouter = require("./routers/routes/reservation");
const rateRouter = require("./routers/routes/rate");
const payRouter = require("./routers/routes/stripe");
// Routers
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/car", carRouter);
app.use("/reserve", reservationRouter);
app.use("/rate", rateRouter);
app.use("/payment", payRouter);
app.get('/send-text', (req, res) => {
  //Welcome Message
  res.send('Hello to the Twilio Server')

  //_GET Variables
  const { recipient, textmessage } = req.query;
  console.log(req.query);


  //Send Text
  client.messages.create({
      body: textmessage,
      to: `+962${recipient}`,  // Text this number
      from: '+14845596976' // From a valid Twilio number
  }).then((message) => console.log("message.body",message.body))
   .catch((err)=>{console.log("err",err);})
})
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   onlineUsers.shift();
// for (let index = 0; index < onlineUsers.length; index++) {
//         if(onlineUsers[index].username==username){
//           console.log(onlineUsers[index]);
//           return onlineUsers[index]
//         }

// }
//   // return onlineUsers.find((user) => user.username === username);
// };

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// setting up the connection
io.on("connection", (socket) => {
  // `socket.id` is the id assigned to the user that connected
  console.log(`${socket.id} is connected`);

  socket.on("set_notification", (data) => {
    // console.log("data",data.amount);
    // socket.to("adminId").emit("set_notification",data.content);
    socket.broadcast.emit("set_notification3", data);
    console.log('data from server',data)
  });

  socket.on("disconnect", (socket) => {
    console.log(`${socket.id} is disconnected`);
  });
});
