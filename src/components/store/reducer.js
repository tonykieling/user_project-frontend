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
      userAdmin: action.data.user.userAdmin
    }

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      userAdmin: ""
    }
  }

  return newState
}

export default reducer