const express = require("express")
const {addNewCar,getCarById,getCarByuserId,updateCarById,toggleCarAvailability,deleteCarById}=require("../controllers/car")
const carRouter = express.Router()

carRouter.post("/",addNewCar)
carRouter.get("/:car_id",getCarById)
carRouter.get("/user/:user_id",getCarByuserId)
carRouter.put("/:car_id",updateCarById)
carRouter.put("/available/:car_id",toggleCarAvailability)
carRouter.put("/delete/:car_id",deleteCarById)





module.exports=carRouter