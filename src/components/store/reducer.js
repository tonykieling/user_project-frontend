const initialState = {
  email: "",
  password: "",
  typeUser: ""
}

const reducer = (state = initialState, action) => {
console.log("REDUCER!!!!!!!!!!!!!!!!")  
  let newState = {...state}
  if (action.type === "LOGIN") {
    newState = {
      email: action.email
      // typeUser: action.value.typeUser
    }
    console.log(`Logged:
            ${JSON.stringify(action)}`)

  } else if (action.type === "LOGOUT") {
    newState = {
      email: "",
      typeUser: ""
    }
  }

  return newState
}

export default reducer