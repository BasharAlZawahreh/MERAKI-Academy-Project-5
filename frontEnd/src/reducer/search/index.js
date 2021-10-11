const initialState = {
  searches: [],
};

const searches = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCHES":
      console.log('payload',payload)
      return { searches: payload };

    default:
      return state;
  }
};

export default searches;
