import { saveState } from './localStorage.js'

const initialState = {
  id: "",
  email: "",
  password: "",
  userAdmin: ""
}

const reducer = (state = initialState, action) => {
  let newState = {...state}
  console.log("inside reducer, user: ", action.data)
  console.log("inside reducer, newState: ", newState)
  if (action.type === "LOGIN") {
    newState = {
      id: action.data.user.id,
      email: action.data.user.email,
      name: action.data.name,
      userAdmin: action.data.user.user_admin
    }
    saveState(action.data.user.email)

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      userAdmin: ""
    }
  }

  return newState
}

export default reducer