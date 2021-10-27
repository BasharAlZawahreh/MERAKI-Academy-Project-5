export const setToken = (token) => {
  return { type: "SET-TOKEN", payload: token };
};

export const removeToken = (token) => {
  return { type: "REMOVE-TOKEN", payload: token };
};
