import { saveState, clearUserLS } from './localStorage.js'

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
      name: action.data.user.name,
      userAdmin: action.data.user.userAdmin
    }
    saveState(newState)

  } else if (action.type === "LOGOUT") {
    newState = {
      id: undefined,
      email: undefined,
      password: undefined,
      userAdmin: undefined
    }
    clearUserLS()
  }

  return newState
}

export default reducer
