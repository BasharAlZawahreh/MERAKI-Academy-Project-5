const express = require("express");
const { login } = require("../../Admin/Controllers/login");

const {
    makeUserAdminById,
    getAllUsers,
    BlockUserById,
} = require("../../Admin/Controllers/users");

const { DeleteRatebyId } = require("../../Admin/Controllers/rates");

// define router
const adminRouter = express.Router();

const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

// 			routes
//post  http://localhost:5000/admin/login/
adminRouter.post("/login", login);

//get  http://localhost:5000/admin/users/
adminRouter.get("/users", authentication, getAllUsers);

//patch  http://localhost:5000/admin/makeAdmin/2
adminRouter.patch("/blockUser/:id", authentication, BlockUserById);

adminRouter.delete("/deleteRate/:id", authentication, DeleteRatebyId);

//post  http://localhost:5000/admin/makeAdmin/2
adminRouter.post(
  "/makeAdmin/:id",
  authentication,
  authorization("SuperAdmin"),
  makeUserAdminById
);

module.exports = adminRouter;
