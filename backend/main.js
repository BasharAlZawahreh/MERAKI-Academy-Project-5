const express = require("express");
const cors = require('cors');
require("./db/db.js");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// import Routers
const adminRouter=require("./Admin/router/AdminRouter");
app.use(express.json());
// Routers
app.use("/admin",adminRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
