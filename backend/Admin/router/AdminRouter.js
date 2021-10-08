const express = require("express");
const { login } = require("../../Admin/Controllers/login");
const { makeUserAdminById, getAllUsers } = require("../../Admin/Controllers/users");

// define router
const adminRouter = express.Router();

const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

// 			routes
//post  http://localhost:5000/admin/login/
adminRouter.post("/login", login);

//get  http://localhost:5000/admin/users/
adminRouter.get("/user", authentication, getAllUsers);

//post  http://localhost:5000/admin/makeAdmin/2
adminRouter.post("/makeAdmin/:id", authentication, authorization("SuperAdmin"), makeUserAdminById);

module.exports = adminRouter;