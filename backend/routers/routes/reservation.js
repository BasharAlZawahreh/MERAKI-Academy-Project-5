const express=require("express");
const {createNewReservation,getAllReservationsByUserId,updateReservationById,deleteReservationById}=require("../controllers/reservation");
const reservationRouter=express.Router();
 const {authentication}=require("../middlewares/authentication")
reservationRouter.post("/",authentication,createNewReservation)
 reservationRouter.get("/user_id",authentication,getAllReservationsByUserId)
 reservationRouter.put("/:id",authentication,updateReservationById)
 reservationRouter.delete("/:id",authentication,deleteReservationById)

module.exports=reservationRouter