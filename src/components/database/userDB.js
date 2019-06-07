// const randomID = require('../tools/randomGen.js');
// const bcrypt = require('bcrypt');

// const num1 = randomID();
// const num2 = randomID();
// const num3 = randomID();
const num1 = 1;
const num2 = 2;
const num3 = 3;

const user = {
  [num1]: {
    id: num1,
    name: "Bob",
    email: "bob@email",
    password: "bob",
    // password: bcrypt.hashSync("bob", 10),
    deleted: false,
    user_admin: true
  },

  [num2]: {
    id: num2,
    name: "Tony",
    email: "tony@email",
    password: "tony",
    // password: bcrypt.hashSync("tony", 10),
    deleted: false,
    user_admin: true
  },

  [num3]: {
    id: num3,
    name: "Rod",
    email: "rod@email",
    password: "rod",
    // password: bcrypt.hashSync("sue", 10),
    deleted: false,
    user_admin: false
  }
};

module.exports = user;
