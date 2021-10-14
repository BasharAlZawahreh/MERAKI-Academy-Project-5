const initialState = {
  searches: [],
  car_Id: "",
};

const searches = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCHES":
      return { searches: payload };
    case "SET_SEARCHE_Car_ID":
      console.log("payload", payload);
      return { car_Id: payload };
    default:
      return state;
  }
};

export default searches;
