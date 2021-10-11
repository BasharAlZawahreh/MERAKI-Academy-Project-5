const express = require("express")
const {login,loginWithGoogle}=require("../controllers/login")

const loginRouter =  express.Router()

loginRouter.post("/",login)
loginRouter.post("/loginWithGoogle", loginWithGoogle);
module.exports = loginRouter;
