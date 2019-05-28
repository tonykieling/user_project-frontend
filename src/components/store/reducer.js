const initialState = {
  email: "",
  password: "",
  typeUser: ""
}

const reducer = (state = initialState, action) => {
  const newState = {... state}
  if (action.type === "LOGIN") {
    newState = {
      email: action.value.email,
      typeUser: action.value.typeUser
    }
    console.log(`Logged:
            ${action}`)

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      typeUser: ""
    }
  }

  return newState
}

export default reducer