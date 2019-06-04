import { saveState } from './localStorage.js'

const initialState = {
  id: "",
  email: "",
  password: "",
  userAdmin: ""
}

const reducer = (state = initialState, action) => {
  let newState = {...state}
  if (action.type === "LOGIN") {
    console.log('newState ANTES: ', newState)
    newState = {
      id: action.data.user.id,
      email: action.data.user.email,
      name: action.data.user.name || "",
      userAdmin: action.data.user.user_admin
    }
    saveState(action.data.user.email)
    console.log('newState DEPOIS: ', newState)

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      userAdmin: ""
    }
  }

  return newState
}

export default reducer
