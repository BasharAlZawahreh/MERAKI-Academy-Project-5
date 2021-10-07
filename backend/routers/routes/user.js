const express = require("express");
const { createNewUser,updateUserById } = require("../controller/user");


const userRouter = express.Router();

 

userRouter.post("/", createNewUser);
userRouter.put("/:id",updateUserById)

module.exports = userRouter;
