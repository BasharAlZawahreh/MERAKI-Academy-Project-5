const initialState = {
  searches: [],
};

const searches = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCHES":
      return { searches: payload };

    default:
      return state;
  }
};

export default searches;
