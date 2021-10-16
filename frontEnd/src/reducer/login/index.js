const initialState = {
    token: localStorage.getItem("token"),
  };

   const token = (state=initialState,{type,payload}) => {
    switch (type) {
        case "SET-TOKEN":
            //console.log("pay",payload);
            return { token: payload };
    
        default:return state

    }
  };
  console.log("tokenRedus,",initialState.token);
  export default token;
