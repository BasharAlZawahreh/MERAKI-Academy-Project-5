export const setReservation=(cars)=>{
    return  {type:"SET_RESERVATION",payload:Reservations}
}
export const updateReservation=(car)=>{
    return {type:"UPDATE_RESERVATION",payload:Reservation}
}
export const addReservation=(car)=>{
    return {type:"ADD_RESERVATION",payload:Reservation}
}
export const deleteReservation=(id)=>{
    return {type:"DELETE_RESERVATION",payload:id}
}