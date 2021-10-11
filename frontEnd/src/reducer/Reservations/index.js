const initialState = {
  reservations: [],
};
const Reservation = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_RESERVATION":
      return { reservations: [...state.reservations, payload] };

    case "SET_RESERVATION":
      return { reservations: payload };

    case "UPDATE_RESERVATION":
      return {
        reservations: state.reservations.map((elem) => {
          return elem.res_id === payload.res_id ? payload : elem;
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
export default Reservation;
