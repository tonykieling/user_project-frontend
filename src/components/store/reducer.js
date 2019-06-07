import { saveState, clearUserLS } from './localStorage.js'

const initialState = {
  id: "",
  email: "",
  password: "",
  userAdmin: ""
}

const reducer = (state = initialState, action) => {
console.log("state=> ", state)
  let newState = {...state}
  if (action.type === "LOGIN") {
    // console.log("LOGINNN: ", JSON.stringify(action))
    newState = {
      id: action.data.user.id,
      email: action.data.user.email,
      name: action.data.user.name,
      userAdmin: action.data.user.user_admin
    }
    saveState(newState)
    // console.log("inside LOGIN at reducer: ", newState)

  } else if (action.type === "LOGOUT") {
    // console.log("inside reducer logout")
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
