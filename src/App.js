import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import './App.css';
import Home from './components/Home.js';
import Nav from './components/Nav.js';
// import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
// import Error from './components/Error.js';

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

  // checkUser = ({email as loginEmail, password}) => {
  checkUser = (userInfo) => {
    console.log("App-checkUser: ", userInfo.email, " + ", userInfo.password)
    // console.log("App-checkUser: ", email, " + ", password)
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
  }

  render() {
      return (
        <Router>
          <div>
          {/* <Switch> */}
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
            {/* {
              !this.state.userLogged ? (
                <Route path="/login" render={(props) => <Login {...props} checkUser={this.checkUser} />} />
              ) : (
                <Route path="/login" render={(props) => {
                  return <Redirect to="/"/>
                }} />

              )
            } */}

            {
                <Route path="/login" render={(props) => {
                  if (!this.state.userLogged)  {
                    return <Login {...props} checkUser={this.checkUser} />

                  } else {
                    return <Redirect to="/"/>

                  }
                }} />
            }

            <Route path="/register" component={Register} />
            <Route
              exact path="/"
              render={(props) => <Home {...props} userLogged={this.state.userLogged} />} />
            {/* <Route component={Error} /> */}
          {/* </Switch> */}
          </div>
        </Router>
    );
  }
}
