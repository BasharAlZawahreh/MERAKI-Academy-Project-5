const initialState = {
    token: "",
  };

   const token = (state=initialState,{type,payload}) => {
    switch (type) {
        case "SET-TOKEN":
            return { token: payload };
    
        default:return state

    }
  };

  export default token;
