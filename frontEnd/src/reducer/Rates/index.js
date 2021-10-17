const initialState = {
    rates: [],
  };
  const rate = (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADD_RATE":
        return { rates: [...state.rates, payload] };
  
      case "SET_RATE":
        return { rates: payload };
  
      
     
      default:
        return state;
    }
  };
  
  export default rate;
  