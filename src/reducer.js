export const initialState = {
  uid: null,
  user: null,
  displayName: null,
  photoURL: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_SESSION: "SET_SESSION",
};

const reducer = (state, action) => {
  console.log("this ist the dispatch action => " + action);
  switch (action.type) {
    case actionTypes.SET_USER:
      localStorage.setItem("user", action.user);
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_SESSION:
      localStorage.setItem("uid", action.uid);
      localStorage.setItem("displayName", action.displayName);
      localStorage.setItem("photoURL", action.photoURL);
      return {
        ...state,
        uid: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL,
      };
    default:
      return state;
  }
};

export default reducer;
