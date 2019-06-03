// this module allows persist the data in localStorage and keep the data among different browser tabs, and after the user rebooting the system, as well

export const getState = () => {
  try {
    const serializedState = localStorage.getItem('user')
console.log("serializedState: ", serializedState)    
    if (!serializedState)
      return undefined
    return JSON.parse(serializedState)
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