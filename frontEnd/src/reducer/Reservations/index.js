const initialState = {
  reservations: [],
  editOrInsert: false,
  farhan: {},
};
const reservation = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_RESERVATION":
      return { reservations: [...state.reservations, payload] };

    case "SET_RESERVATION":
      return { reservations: payload };

    case "SET_EDIT_OR_INSERT":
      return { editOrInsert: payload };

    // case "SET_UPDATE_RESERVATION":
    //   console.log("reducer",payload);
    //   return { UpdateReservation:state.UpdateReservation.push(payload)

    // };
    //Object.assign

    case "UPDATE_RESERVATION":
      // console.log( Object.assign(state.UpdateReservation,payload));
      // console.log(state.reservations);
      console.log("reducer", payload);
      return {
        farhan: payload,
      };

    case "UPDATE_RESERVATION_CONFIRMATION":
      let res = state.reservations.find((elem) => {
        return elem.res_id === payload;
      });

      let av = res.isConfirmed;
      if (av == 1) {
        res.isConfirmed = 0;
      } else if (av == 0) {
        res.isConfirmed = 1;
      }

      return {
        reservations: state.reservations.map((elem) => {
          return elem.car_id === payload ? (elem = res) : (elem = elem);
        }),
      };

    case "DELETE_RESERVATION":
      return {
        reservations: state.reservations.filter((elem) => {
          return elem.res_id !== payload;
        }),
      };
    default:
      return state;
  }
};
export default reservation;
