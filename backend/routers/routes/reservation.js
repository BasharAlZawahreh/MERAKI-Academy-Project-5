const express=require("express");
const {createNewReservation,getAllReservationsByUserId,updateReservationById,deleteReservationById}=require("../controllers/reservation");
const reservationRouter=express.Router();

reservationRouter.post("/",createNewReservation)
reservationRouter.get("/:id",getAllReservationsByUserId)
reservationRouter.put("/:id",updateReservationById)
reservationRouter.delete("/:id",deleteReservationById)

module.exports=reservationRouter