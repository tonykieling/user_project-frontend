import React, { Component } from 'react';
import Nav from './Nav.js';

export class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        <h2>User's Logged!!</h2>        
      </div>
    )
  }
}

export default Home
