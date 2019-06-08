const userDB = require('./userDB.js')

const checkUser = (data) => {
// function checkUser(data) {
  //console.log('data > ', data);
  const db = userDB;
  for (let k in db)
    if (db[k].email.toLowerCase() === data.email.toLowerCase())
      if (db[k].password === data.password)
        return {
          name: db[k].name,
          email: db[k].email,
          id: db[k].id,
          user_admin: db[k].user_admin };

  return false;
}

const viewUser = () => {

  //console.log('data > ', data);
  const db = userDB;
  for (let k in db)
        console.log(db[k]);
  return true;
}


const addUser = (data) => {

    const db = userDB;

    // 1) loops through the USERDB to check if email already exists in the DATABASE
    const objectUser = null;
    for (let k in db){
      if (db[k].email.toLowerCase() === data.email.toLowerCase()){
          objectUser = {
            id          : db[k].id,
            name        : db[k].name,
            email       : db[k].email,
            user_admin  : db[k].user_admin,
            deleted     : db[k].deleted
          }
          // IF email FOUND in DATABASE return FALSE
          //return false;
          return objectUser;
        }
    }

    // 2) if the search for the user's email did not return FOUND USER
    // add new user data to the DATABASE

    // 2a) define the NEXT index of the database based on the size of the OBJECT
    const dbIndex = Object.keys(db).length + 1;


    // 3) create new USER to be added to the DATABASE
    const newUser = {
      id: dbIndex,
      name: data.name,
      email: data.email,
      password: data.password,
      deleted: false,
      user_admin: false
    };
    //console.log(newUser);

    // 4) ADD new USER to DATABASE
    //db.push( newUser );
    db[dbIndex] = newUser;

    // return the NEWUSER
    return newUser;

}

module.exports = {
  checkUser,
  addUser,
  viewUser
}
