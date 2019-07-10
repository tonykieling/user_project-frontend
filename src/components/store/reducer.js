import { saveState, clearUserLS } from './localStorage.js'

const initialState = {}

const reducer = (state = initialState, action) => {
  let newState = {...state};
  console.log("111newState", newState);
  console.log("action", action);
  if (action.type === "LOGIN") {
    newState = {...state,
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
      name        : undefined,
      pictureName : undefined,
      userAdmin   : undefined,
      userActive  : undefined,
      userToBeChangedId           : undefined,
      userToBeChangedEmail        : undefined,
      userToBeChangedName         : undefined,
      userToBeChangedPictureName  : undefined,
      userToBeChangedUserAdmin    : undefined,
      userToBeChangedUserActive   : undefined
    };
    clearUserLS();
  } else if (action.type === "ADMINCHANGEUSER") {
    console.log("usertobechanged@reducer", action.data);
    newState = {...state,
      userToBeChangedId           : action.data.id,
      userToBeChangedEmail        : action.data.email,
      userToBeChangedName         : action.data.name,
      userToBeChangedPictureName  : action.data.pictureName,
      userToBeChangedUserAdmin    : action.data.userAdmin,
      userToBeChangedUserActive   : action.data.userActive
    };
    saveState(newState);
  }
  
  return newState;
}

export default reducer;
