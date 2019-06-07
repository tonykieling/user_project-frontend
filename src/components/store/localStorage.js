// this module allows persist the data in localStorage and keep the data among different browser tabs, and after the user rebooting the system, as well

export const getUser = () => {
  try {
    const user = {
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      userAdmin: localStorage.getItem('userAdmin'),
    }
    if (!user){
      return undefined
    }
    return(user)
  } catch (err) {
    return undefined
  }
}

export const saveState = user => {
  try {
    localStorage.setItem('id', user.id)
    localStorage.setItem('name', user.name)
    localStorage.setItem('email', user.email)
    localStorage.setItem('userAdmin', user.userAdmin)
  } catch (err) {
    return err.message
  }
}

export const clearUserLS = () => {
  localStorage.removeItem('id')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('userAdmin')
}
