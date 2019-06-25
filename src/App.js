import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from './components/Home.js';
import Navega from './components/Navega.js';
import Lands from './components/Lands.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Error from './components/Error.js';
import Grant from './components/Grant.js';
import Seize from './components/Seize.js';
import Confirm from './components/Confirm.js';
import Menu1 from './components/Menu1.js';
import UserPage from './components/UserPage.js';
import AdminPage from './components/AdminPage.js';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="navbarandbody">
          <Navega />
          <Switch>
            <Route exact path="/"
              render = {() => {
                if(this.props.storeEmail)
                  return <Home />
                else
                  return <Redirect to = "/lands" />
              }} />

            <Route exact path="/lands" component={Lands} />
            <Route path="/menu1" component={Menu1} />
            <Route path="/grant" component={Grant} />
            <Route path="/seize" component={Seize} />
            <Route path="/user"
              render = {() => {
                if(this.props.storeEmail) {
                  console.log("PROPS: ", this.props);
                  if (this.props.storeUserAdmin)
                    return <AdminPage />
                  else return <UserPage />
                } else
                  return <Redirect to = "/" />
              }}
            />
            <Route path="/login"
              render={() => {
                if (!this.props.storeEmail)
                  return <Login />
                else
                  return <Redirect to="/"/>
              }}
            />
            <Route path="/register" component={Register} />
            <Route path="/confirm" component={Confirm} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    storeEmail: store.email,
    storeUserAdmin: store.userAdmin
  }
}

export default connect(mapStateToProps, null)(App)
