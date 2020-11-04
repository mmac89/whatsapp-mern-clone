export const initialState = {
  user: null,
  //   rooms: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  //   SET_ROOMS: "SET_ROOMS",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    // case actionTypes.SET_ROOMS:
    //   return {
    //     ...state,
    //     rooms: action.rooms,
    //   };
    default:
      return state;
  }
};

export default reducer;
