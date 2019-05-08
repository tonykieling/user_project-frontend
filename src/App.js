// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './App.css';
import Home from './components/Home.js';
// import Login from './components/Login.js';
import Nav from './components/Nav.js';
import Landing from './components/Landing.js';

import React, { Component } from 'react';


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLogged: true,
      email: "bob",
      password: ""
    };
  }

  checkPasswd = ({email, password}) => {
    // console.log("checkPasswd: ", email, " + ", password)
    if (email === this.state.email && password === this.state.password) {
      this.setState({
        userLogged: true
      });
      return true;
    } else return false;
  }

  render() {
      return (
        <div>
          <Nav email={this.state.email} />
          {(this.state.userLogged) ? 
            (<Home />) :
            (<Landing />)
            // (<Login checkPasswd={this.checkPasswd}/>)
          }
      </div>
    );
  }
}
