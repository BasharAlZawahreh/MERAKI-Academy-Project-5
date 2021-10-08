const express = require("express")
const {addNewCar,getCarById}=require("../controllers/car")
const carRouter = express.Router()

carRouter.post("/",addNewCar)
carRouter.get("/:car_id",getCarById)





module.exports=carRouter