// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';

import React, { Component } from 'react'


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLogged: false,
      email: "bob",
      password: "bob"
    };
  }

  checkPasswd = ({email, password}) => {
    console.log("checkPasswd: ", email, " + ", password)
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
          {this.state.userLogged? 
            (<Home />) :
            (<Login checkPasswd={this.checkPasswd}/>)
          }
      </div>
    );
  }
}

