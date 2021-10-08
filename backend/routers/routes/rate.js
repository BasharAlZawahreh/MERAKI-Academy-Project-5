const express = require("express");
const {addToRate,getRateByCarId}=require("../controllers/rate");
const {authentication}=require("../middlewares/authentication");
const rateRouter = express.Router();

rateRouter.post("/:car_id",authentication,addToRate);
rateRouter.get("/:car_id",authentication,getRateByCarId);

module.exports=rateRouter;