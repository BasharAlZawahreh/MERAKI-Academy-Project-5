const express = require("express");
const {
  addNewCar,
  getCarById,
  getCarByuserId,
  updateCarById,
  toggleCarAvailability,
  deleteCarById,
  carsFilter,
  getCarTypes,
  getCarBrands,
  addImgs
} = require("../controllers/car");
const { authentication } = require("../middlewares/authentication");
const carRouter = express.Router();

carRouter.post("/",authentication,addNewCar)
carRouter.post("/imgs",authentication,addImgs)
carRouter.get("/user",authentication,getCarByuserId)
carRouter.get("/cartypes", getCarTypes);
carRouter.get("/carbrands", getCarBrands);

carRouter.get("/car/:car_id",getCarById)
carRouter.put("/:car_id",updateCarById)
carRouter.put("/available/:car_id",toggleCarAvailability)
carRouter.put("/delete/:car_id",deleteCarById)

carRouter.post("/filter", carsFilter);

module.exports = carRouter;
