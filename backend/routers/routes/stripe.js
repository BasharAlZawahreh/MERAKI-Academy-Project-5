const express=require("express")
const{Pay}=require("../controllers/stripe")

const payRouter=express.Router()

payRouter.post("/",Pay)

module.exports=payRouter