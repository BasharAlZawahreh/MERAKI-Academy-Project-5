const initialState = {
  adminToken: "",
};

const adminToken = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET-TOKEN":
      return { token: payload };

    default:
      return state;
  }
};

export default adminToken;
