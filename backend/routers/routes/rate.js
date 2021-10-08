const express = require("express");
const {addToRate}=require("../controllers/rate");
const {authentication}=require("../middlewares/authentication");
const rateRouter = express.Router();

rateRouter.post("/:car_id",authentication,addToRate);

module.exports=rateRouter;