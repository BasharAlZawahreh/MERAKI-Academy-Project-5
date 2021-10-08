const express = require("express");
const { login } = require("../../Admin/Controllers/login");
const { makeUserAdminById } = require("../../Admin/Controllers/users");

// define router
const adminRouter = express.Router();

const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

// 			routes
//post  http://localhost:5000/login/
adminRouter.post("/login", login);
adminRouter.post("/makeAdmin/:id", authentication, authorization("SuperAdmin"), makeUserAdminById);

module.exports = adminRouter;