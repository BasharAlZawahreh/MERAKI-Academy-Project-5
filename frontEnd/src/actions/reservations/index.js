export const setReservation=(reservations)=>{
    return  {type:"SET_RESERVATION",payload:reservations}
}
export const updateReservation=(reservation)=>{
    return {type:"UPDATE_RESERVATION",payload:reservation}
}
export const addReservation=(reservation)=>{
    return {type:"ADD_RESERVATION",payload:reservation}
}
export const deleteReservation=(id)=>{
    return {type:"DELETE_RESERVATION",payload:id}
}