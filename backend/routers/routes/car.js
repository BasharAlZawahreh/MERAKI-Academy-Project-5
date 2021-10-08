const express = require("express")
const {addNewCar}=require("../controllers/car")
const carRouter = express.Router()

carRouter.post("/",addNewCar)





module.exports=carRouter