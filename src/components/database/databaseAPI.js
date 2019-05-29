const userDB = require('./userDB.js')

const checkUser = (data) => {
// function checkUser(data) {
  const db = userDB;
  for (let k in db)
    if (db[k].email.toLowerCase() === data.email.toLowerCase())
      if (db[k].password === data.password)      
        return { id: db[k].id, email: db[k].email, user_admin: db[k].user_admin };

  return false;
}

const addUser = data => {
// empty right now
}

module.exports = {
  checkUser,
  addUser
}