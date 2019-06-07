import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from './components/Home.js';
import Navega from './components/Navega.js';
import Lands from './components/Lands.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Error from './components/Error.js';
import Confirm from './components/Confirm.js';
import UserPage from './components/UserPage.js';
import { connect } from 'react-redux'
// import { getUser } from './components/store/localStorage.js'

class App extends Component {

  // state = {
  //   userLogged: false,
  //   users: [
  //     {email: "bob@bob", password: "bob"},
  //     {email: "sue@sue", password: "sue"}
  //   ]
  // };

  // checkUser = (userInfo) => {
  //   const result = this.state.users.filter(user =>
  //     user.email.toLowerCase() === userInfo.email.toLowerCase() && user.password === userInfo.password)

  //   if (result[0]) {
  //       this.setState({
  //         userLogged: true
  //       })
  //     return true;
  //   }
  //   return false;
  // }

  render() {
      return (
        <Router>
            <div className="navbarandbody">
                {/* NAV BAR on the top of the page */}
                <Navega />
                <Switch>

                      {/* to HOME */}
                      <Route
                        exact path="/"
                        // render={(props) => <Home {...props} userLogged={this.state.userLogged} />}
                        component={Home}
                      />

                      {/* to NOT FINISHED NEW LANDING PAGE */}
                      <Route path="/lands" component={Lands} />

                      {/* to USER PROFILE PAGE */}
                      <Route path="/user"
                            render = {() => {
                              if(this.props.email) {
                                return <UserPage />
                              } else {
                                return <Redirect to = "/login" />
                              }
                            }
                            } />
                      
                      {<Route path="/login"
                            render={() => {
                                    // if (!this.state.userLogged)  {
                                    if (!this.props.email)  {
                                      // return <Login {...props} checkUser={this.checkUser} />
                                      return <Login />

                                    } else {
                                      return <Redirect to="/"/>
                                    }
                            }}
                      />}

                      {/* to REGISTER */}
                      <Route path="/register" component={Register} />

                      {/* to CONFIRMATION PAGE */}
                      <Route path="/confirm" component={Confirm} />

                      {/* to ERROR PAGE */}
                      <Route component={Error} />

                </Switch>
              </div>
        </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    email: store.email
  }
}

export default connect(mapStateToProps, null)(App)