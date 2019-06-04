// this module allows persist the data in localStorage and keep the data among different browser tabs, and after the user rebooting the system, as well

export const getUser = () => {
  try {
    const user = localStorage.getItem('user')
console.log("serializedState: ", user)    
    if (!user){
      console.log("NO user inside getUSER()")
      return undefined
    }
    return(user)
  } catch (err) {
    return undefined
  }
}

export const saveState = user => {
  console.log("user on saveState: ", user)
  try {
    localStorage.setItem('user', user)
  } catch (err) {
    return err.message
  }
}

export const clearUserLS = () => {
  localStorage.removeItem('user')
}