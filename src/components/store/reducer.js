const initialState = {
  email: "",
  password: "",
  userAdmin: ""
}

const reducer = (state = initialState, action) => {
console.log("REDUCER!!!!!!!!!!!!!!!!")  
  let newState = {...state}
  if (action.type === "LOGIN") {
    newState = {
      email: action.email,
      userAdmin: action.userAdmin
    }
    console.log(`Logged:
            ${JSON.stringify(action)}`)

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      userAdmin: ""
    }
  }

  return newState
}

export default reducer