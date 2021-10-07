const express = require("express");
const { login } = require("../../Admin/Controllers/login");

// define router
const adminRouter = express.Router();

// 			routes
//post  http://localhost:5000/login/
adminRouter.post("/login", login);

module.exports = adminRouter;