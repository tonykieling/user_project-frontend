// import React from 'react'
import Nav from './Nav.js'

import React, { Component } from 'react'


export default class Home extends Component {
  // constructor(props){
  //   super(props);
  //   this.
    state = {
      userEmail: ""
    }
  // }
  
  handleChange = e => {
    console.log("userEmail: ", e.target.value);
    this.setState({
      userEmail: e.target.value
    });
  }

  isValid(){
    if (this.state.userEmail === "")
      return false;
    return true;
  }

  render() {
    return (
      <div>
        <Nav />

        <form onSubmit={this.handleSubmit}>
          <label>User</label>
          <input 
            type="text"
            onChange={this.handleChange} 
            value={this.state.userEmail} 
            placeholder="Type the user's email">
          </input>
          <br />
          <label>Password</label>
          <input type="password" placeholder="type the user's password"></input>
          <br />
          <button>Submit</button>
        </form>

        
      </div>
    )
  }
}
