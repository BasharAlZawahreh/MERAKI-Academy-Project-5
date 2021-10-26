const initialState = {
  users: [],
};
const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      return { users: [...state.users, payload] };

    case "SET_USER":
      return { users: payload };

    case "DELETE_USER":
      return {
        users: state.users.filter((elem) => {
          return elem.user_id !== payload;
        }),
      };

    case "UPDATE_USER":
      let user = state.users.find((elem) => {
        return elem.user_id === payload;
      });

      let av = user.is_Blocked;
      if (av == 1) {
        user.is_Blocked = 0;
      } else if (av == 0) {
        user.is_Blocked = 1;
      }

      return {
        users: state.users.map((elem) => {
          return elem.user_id === payload ? (elem = user) : (elem = elem);
        }),
      };

    default:
      return state;
  }
};
export default user;
