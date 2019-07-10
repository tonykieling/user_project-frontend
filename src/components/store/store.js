import { createStore } from 'redux';
import reducer from './reducer.js';
import { getUser } from './localStorage.js';

const persistedData = {
  id          : getUser().id,
  email       : getUser().email,
  name        : getUser().name,
  pictureName : getUser().pictureName,
  userAdmin   : getUser().userAdmin,
  userActive  : getUser().userActive,
  userToBeChangedId           : getUser().userToBeChangedId,
  userToBeChangedEmail        : getUser().userToBeChangedEmail,
  userToBeChangedName         : getUser().userToBeChangedName,
  userToBeChangedPictureName  : getUser().userToBeChangedPictureName,
  userToBeChangedUserAdmin    : getUser().userToBeChangedUserAdmin,
  userToBeChangedUserActive   : getUser().userToBeChangedUserActive
}

const store = createStore(
  reducer,
  persistedData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // line above is just to allows to use the devtools
);

store.subscribe(() => {
  console.log("store.subscribe- ", store.getState())
})

export default store
