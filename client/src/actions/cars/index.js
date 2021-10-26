export const setCar=(cars)=>{
    return  {type:"SET_CAR",payload:cars}
}
export const updateCar=(car)=>{
    return {type:"UPDATE_CAR",payload:car}
}
export const addCar=(car)=>{
    return {type:"ADD_CAR",payload:car}
}
export const deleteCar=(id)=>{
    return {type:"DELETE_CAR",payload:id}
}