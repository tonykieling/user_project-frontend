const userDB = require('./userDB.js')

const checkUser = (data) => {
// function checkUser(data) {
  //console.log('data > ', data);
  const db = userDB;
  for (let k in db)
    if (db[k].email.toLowerCase() === data.email.toLowerCase())
      if (db[k].password === data.password)
        return { name: db[k].name, email: db[k].email, id: db[k].id };

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
    //console.log('data > ', data);
    const db = userDB;
    // loops thrrough the USERDB to check is email already exists in the DATABASE
    for (let k in db){
      if (db[k].email.toLowerCase() === data.email.toLowerCase())
          // IF email FOUND in DATABASE return FALSE
          return false;
    }

    // if the search for the user's email did not return TRUE
    // add new user data to the DATABASE

    // define the NEXT index of the database based on the size of the OBJECT
    const dbIndex = Object.keys(db).length + 1;
    //console.log('db.size', Object.keys(db).length);
    //console.log(db);

    // create new USER to be added to the DATABASE
    const newUser = {
      id: dbIndex,
      name: data.name,
      email: data.email,
      password: data.password,
      deleted: false,
      user_admin: false
    };
    console.log(newUser);

    // ADD new USER to DATABASE
    //db.push( newUser );
    db[dbIndex] = newUser;

    // return FALSE means OK
    return true;

}

module.exports = {
  checkUser,
  addUser,
  viewUser
}
