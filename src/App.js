import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from './components/Home.js';
// import Login from './components/Login.js';
import Navega from './components/Navega.js';
//import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
// import Error from './components/Error.js';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userLogged: false,
      users: [
        {email: "bob@bob", password: "bob"},
        {email: "sue@sue", password: "sue"}
      ]
    };
  } // ==================  end of constructor  ================

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
  } // ==================  end of CHECKUSER  ================

  render() {
      return (
        <Router>
            <div className="navbarandbody">
                {/* NAV BAR on the top of the page */}
                <Navega
                  userLogged={this.state.userLogged}
                  checkUser={this.checkUser}
                  email={this.state.email}
                  />
                <Switch>

                      {/* to HOME */}
                      <Route
                        exact path="/"
                        render={(props) => <Home {...props} userLogged={this.state.userLogged} />}
                      />

                      {<Route path="/login"
                            render={(props) => {
                                    if (!this.state.userLogged)  {
                                      return <Login {...props} checkUser={this.checkUser} />

                                    } else {
                                      return <Redirect to="/"/>
                                    }
                            }}
                      />}

                      {/* to REGISTER */}
                      <Route path="/register" component={Register} />

                      {/* to ERROR PAGE */}
                      <Route component={Error} />
                </Switch>
              </div>
        </Router>
    );
  } // ==================  end of RENDER  ================
}
