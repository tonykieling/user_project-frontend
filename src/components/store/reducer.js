import { saveState, clearUserLS } from './localStorage.js'

const initialState = {
  id        : "",
  email     : "",
  password  : "",
  userAdmin : ""
}

const reducer = (state = initialState, action) => {
  let newState = {...state};
  console.log("111newState", newState);
  console.log("action", action);
  if (action.type === "LOGIN") {
    newState = {
      id          : action.data.user.id,
      email       : action.data.user.email,
      name        : action.data.user.name,
      pictureName : action.data.user.pictureName,
      userAdmin   : action.data.user.userAdmin,
      userActive  : action.data.user.userActive
    };
  console.log("2222newState", newState);
    saveState(newState);

  } else if (action.type === "LOGOUT") {
    newState = {
      id          : undefined,
      email       : undefined,
      password    : undefined,
      userAdmin   : undefined,
      userActive  : undefined
    };
    clearUserLS();
  } else if (action.type === "ADMINCHANGEUSER") {
    newState = {...state,
      userToBeChangedId         : action.data.id,
      userToBeChangedEmail      : action.data.email,
      userToBeChangedName       : action.data.name,
      userToBeChangedUserAdmin  : action.data.userAdmin,
      userToBeChangedUserActive : action.data.userActive
    };
  }
  return newState;
}

export default reducer;
