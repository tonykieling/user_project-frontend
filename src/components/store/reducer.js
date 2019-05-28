const initialState = {
  email: "",
  typeUser: ""
}

const reducer = (state = initialState, action) => {
  const newState = {... state}
  if (action.type === "LOGIN") {
    newState = {
      email: action.value.email,
      typeUser: action.value.typeUser
    }

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      typeUser: ""
    }
  }

  return newState
}

export default reducer