const express=require("express");
const {createNewReservation,getAllReservationsByUserId,updateReservationById,deleteReservationById,checkprofile}=require("../controllers/reservation");
const reservationRouter=express.Router();
 const {authentication}=require("../middlewares/authentication")
 reservationRouter.post("/",authentication,createNewReservation)
 reservationRouter.get("/user",authentication,getAllReservationsByUserId)
 reservationRouter.put("/:id",authentication,updateReservationById)
 reservationRouter.delete("/:id",authentication,deleteReservationById)
 reservationRouter.get("/user/check",authentication,checkprofile)
module.exports=reservationRouter