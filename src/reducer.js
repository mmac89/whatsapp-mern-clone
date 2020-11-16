export const initialState = {
  user: null,
  token: null,
  //   rooms: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  //   SET_ROOMS: "SET_ROOMS",
  SET_TOKEN: "SET_TOKEN",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      localStorage.setItem("user", action.user);
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_TOKEN:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
