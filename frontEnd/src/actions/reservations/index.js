export const addReservation=(reservations)=>{
    return  {type:"ADD_RESERVATION",payload:reservations}
}

export const setReservation=(reservations)=>{
    return {type:"SET_RESERVATION",payload:reservations}
}
export const updateReservation=(reservation)=>{
    console.log("action",reservation);
    return {type:"UPDATE_RESERVATION",payload:reservation}
}

export const deleteReservation =(id)=>{
    return {type:"DELETE_RESERVATION",payload:id}
}

export const setEditOrInsert =(status)=>{
    return {type:"SET_EDIT_OR_INSERT",payload:status}
}
// export const setUpdateReservation =(reservation)=>{
//     console.log("action",reservation);
//     return {type:"SET_UPDATE_RESERVATION",payload:reservation}
// }

