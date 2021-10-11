const express = require("express");
const { createNewUser,updateUserById /*,loginWithGoogle*/} = require("../controllers/user");


const userRouter = express.Router();

 

userRouter.post("/", createNewUser);
// userRouter.post("/loginWithGoogle", loginWithGoogle);
userRouter.put("/:id",updateUserById)

module.exports = userRouter;
