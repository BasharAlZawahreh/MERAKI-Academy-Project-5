const initialState = {
  users: [],
};
const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      return { users: [...state.users, payload] };

    case "SET_USER":
      return { users: payload };

    case "UPDATE_USER":
      return {
        users: state.users.map((elem) => {
          return elem.user_id === payload.user_id ? payload : elem;
        }),
      };
    default:
      return state;
  }
};
export default user;
