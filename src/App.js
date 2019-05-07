// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';

import React, { Component } from 'react'


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userLogged: false
    };
  }

  render() {
      return (
        <div className="App">
          {this.state.userLogged? 
            (<Home />) :
            (<Login />)
          }
      </div>
    );
  }
}

