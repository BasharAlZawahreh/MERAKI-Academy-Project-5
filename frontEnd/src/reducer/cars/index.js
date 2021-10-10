const initialState = {
    cars: [],
  };
const car =(state = initialState,{ type, payload })=>{
    switch (type) {
     case "ADD_CAR":
      return({cars:[...state.cars,payload]})

        case "SET_CAR" :
        return ({cars:payload});
            
        case "UPDATE_CAR":
            return {
                cars:state.cars.map((elem)=>{
                    return elem.car_id== payload.car_id? (payload):(elem)
                })  

            };
            case "DELETE_CAR":
                return{
                    cars:state.cars.filter((elem)=>{
                        return elem.car_id!==payload
                    })
                }
        default:
            return state;
    }
}
export default car