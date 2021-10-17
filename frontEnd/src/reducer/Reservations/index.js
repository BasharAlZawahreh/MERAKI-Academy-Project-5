const initialState = {
  reservations: [],
  editOrInsert:false,
  farhan:{}
};
const reservation = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_RESERVATION":
      return { reservations: [...state.reservations, payload] };
      
      case "SET_RESERVATION":
      return { reservations: payload };
      
      case "SET_EDIT_OR_INSERT":
      return { editOrInsert:payload };
      
      // case "SET_UPDATE_RESERVATION":
      //   console.log("reducer",payload);
      //   return { UpdateReservation:state.UpdateReservation.push(payload)
      
      // };
//Object.assign

    case "UPDATE_RESERVATION":
      // console.log( Object.assign(state.UpdateReservation,payload));
      // console.log(state.reservations);
      console.log("reducer",payload);
      return {
        farhan:payload}


    case "DELETE_RESERVATION":
      return {
        reservations: state.reservations.filter((elem) => {
           return  elem.res_id !== payload;
        }),
      };
    default:
      return state;
  }
};
export default reservation;
