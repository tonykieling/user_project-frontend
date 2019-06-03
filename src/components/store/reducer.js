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
    newState = {
      id: action.data.user.id,
      email: action.data.user.email,
      name: action.data.name,
      userAdmin: action.data.user.user_admin
    }
    saveState(action.data.user.email)

  } else if (action.type === "LOGOUT") {
    console.log("inside reducer logout")
    newState = undefined
  }

  return newState
}

export default reducer