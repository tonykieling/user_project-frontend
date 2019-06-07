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

class App extends Component {

  render() {
    return (
      <Router>
        <div className="navbarandbody">
          <Navega />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/lands" component={Lands} />

            {/* to USER PROFILE PAGE */}
            <Route path="/user"
                  render = {() => {
                    if(this.props.email)
                      return <UserPage />
                    else
                      return <Redirect to = "/" />
                  }} />
            
            <Route path="/login"
                  render={() => {
                          if (!this.props.email)
                            return <Login />
                          else
                            return <Redirect to="/"/>
                  }} />

            <Route path="/register" component={Register} />
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
