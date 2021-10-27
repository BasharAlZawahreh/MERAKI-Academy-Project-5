const initialState = {
  adminToken: "",
};

const adminToken = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET-TOKEN":
      return { token: payload };
    case "REMOVE-TOKEN":
      return { token: "" };

    default:
      return state;
  }
};

export default adminToken;
