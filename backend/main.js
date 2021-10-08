const express = require("express");
const cors = require('cors');
require("./db/db.js");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
// import Routers
const adminRouter=require("./Admin/router/AdminRouter");
const userRouter=require("./routers/routes/user");
const loginRouter=require("./routers/routes/login");
const reservationRouter=require("./routers/routes/reservation")
// Routers
app.use("/admin",adminRouter);
app.use("/login",loginRouter);
app.use("/users",userRouter);
app.use("/reserve",reservationRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
