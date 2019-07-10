// this module allows persist the data in localStorage and keep the data among different browser tabs, and after the user rebooting the system, as well

export const getUser = () => {
  try {
    const user = {
      id          : localStorage.getItem('id'),
      name        : localStorage.getItem('name'),
      email       : localStorage.getItem('email'),
      pictureName : localStorage.getItem("pictureName"),
      userAdmin   : ((localStorage.getItem('userAdmin') === "true") ? true : false),
      userActive  : ((localStorage.getItem('userActive') === "true") ? true : false),
      userToBeChangedId           : localStorage.getItem("userToBeChangedId"),
      userToBeChangedEmail        : localStorage.getItem("userToBeChangedEmail"),
      userToBeChangedName         : localStorage.getItem("userToBeChangedName"),
      userToBeChangedPictureName  : localStorage.getItem("userToBeChangedPictureName"),
      userToBeChangedUserAdmin    : ((localStorage.getItem("userToBeChangedUserAdmin") === "true") ? true : false),
      userToBeChangedUserActive   : ((localStorage.getItem("userToBeChangedUserActive") === "true") ? true : false),
    }
    if (!user){
      return undefined;
    }
    return(user)
  } catch (err) {
    return undefined;
  }
}

export const saveState = user => {
  try {
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem("pictureName", user.pictureName);
    localStorage.setItem('userAdmin', user.userAdmin);
    localStorage.setItem('userActive', user.userActive);
    localStorage.setItem("userToBeChangedId", user.userToBeChangedId);
    localStorage.setItem("userToBeChangedName", user.userToBeChangedName);
    localStorage.setItem("userToBeChangedEmail", user.userToBeChangedEmail);
    localStorage.setItem("userToBeChangedPictureName", user.userToBeChangedPictureName);
    localStorage.setItem("userToBeChangedAdmin", user.userToBeChangedUserAdmin);
    localStorage.setItem("userToBeChangedActive", user.userToBeChangedUserActive);
  } catch (err) {
    return err.message;
  }
}

export const clearUserLS = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem("pictureName");
  localStorage.removeItem('userAdmin');
  localStorage.removeItem('userActive');
  localStorage.removeItem("userToBeChangedId");
  localStorage.removeItem("userToBeChangedEmail");
  localStorage.removeItem("userToBeChangedName");
  localStorage.removeItem("userToBeChangedPictureName");
  localStorage.removeItem("userToBeChangedUserAdmin");
  localStorage.removeItem("userToBeChangedUserActive");
}
