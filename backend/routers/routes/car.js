const express = require("express")
const {addNewCar,getCarById,getCarByuserId,updateCarById,toggleCarAvailability,deleteCarById}=require("../controllers/car")
const {authentication}=require("../middlewares/authentication")
const carRouter = express.Router()

carRouter.post("/",authentication,addNewCar)
carRouter.get("/:car_id",authentication,getCarById)
carRouter.get("/user",authentication,getCarByuserId)
carRouter.put("/:car_id",authentication,updateCarById)
carRouter.put("/available/:car_id",authentication,toggleCarAvailability)
carRouter.put("/delete/:car_id",authentication,deleteCarById)





module.exports=carRouter