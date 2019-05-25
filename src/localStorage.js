export const getState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null)
      return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // for while, no dealing errors
  }
}