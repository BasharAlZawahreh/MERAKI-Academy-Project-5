const express = require("express");
const { createNewUser,updateUserById } = require("../controllers/user");
 const{authentication}=require("../middlewares/authentication")

const userRouter = express.Router();

 

userRouter.post("/", createNewUser);
userRouter.put("/edit",authentication,updateUserById)

module.exports = userRouter;
