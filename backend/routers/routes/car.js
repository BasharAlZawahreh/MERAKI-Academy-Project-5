const express = require("express")
const {addNewCar,getCarById,getCarByuserId,updateCarById,toggleCarAvailability}=require("../controllers/car")
const carRouter = express.Router()

carRouter.post("/",addNewCar)
carRouter.get("/:car_id",getCarById)
carRouter.get("/user/:user_id",getCarByuserId)
carRouter.put("/:car_id",updateCarById)
carRouter.put("/available/:car_id",toggleCarAvailability)



module.exports=carRouter