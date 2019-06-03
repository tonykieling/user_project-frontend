import { createStore } from 'redux'
import reducer from './reducer.js'
import { getUser } from './localStorage.js'

const persistedData = {
  email: getUser()
}
// console.log("persistedData= ", persistedData)

const store = createStore(
  reducer,
  persistedData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // line above is just to allows to use the devtools
);

// console.log("asd: ", store.getState().user)

export default store