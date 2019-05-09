import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './App.css';
import Home from './components/Home.js';
// import Login from './components/Login.js';
import Nav from './components/Nav.js';
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLogged: false,
      users: [
        {email: "bob@", password: "bob"},
        {email: "sue@", password: "sue"}
      ]
    };
  }

  checkUser = (userInfo) => {
    console.log("App-checkUser: ", userInfo.email, " + ", userInfo.password)
    const result = this.state.users.filter(user => 
      user.email.toLowerCase() === userInfo.email.toLowerCase() && user.password === userInfo.password)

    console.log("result: ", result[0]);
    if (result[0]) {
      this.setState({
        userLogged: true
      })
      return true;
    } 
    return false;
    // this.state.users.forEach((email, password) => {(email === loginEmail) && (password === loginPassword)})
    // if (email === this.state.email && password === this.state.password) {
    //   this.setState({
    //     userLogged: true,
    //     email
    //   });
    //   return true;
    // } else return false;
    // return true;
  }

  render() {
      return (
        <Router>
          <div>
            <Nav 
              userLogged={this.state.userLogged}
              checkUser={this.checkUser}
              email={this.state.email}
              />
              
            {/* {(this.state.userLogged) ? 
              (<Home />) :
              (<Landing />)
              // (<Login checkUser={this.checkUser}/>)
            } */}

            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login" render={(props) => <Login {...props} checkUser={this.checkUser} />} />
            <Route path="/register" component={Register} />
            <Route
              exact path="/"
              render={(props) => <Home {...props} userLogged={this.state.userLogged} />} />
          </div>
        </Router>
    );
  }
}
