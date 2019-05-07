// import React from 'react'
import Nav from './Nav.js'

import React, { Component } from 'react'


export default class Home extends Component {
  // constructor(props){
  //   super(props);
  //   this.
    state = {
      email: "",
      passwd: ""
    }
  // }
  
  handleChange = e => {
    // console.log("email: ", e.target.value);
    this.setState({
      email: e.target.value
    });
  }

  handleP = e => {
    console.log("password: ", e.target.value);
    this.setState({
      passwd: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("e.target: ", e.target);
    console.log("this.state: ", this.state)
  }

  isValid = () => {
    if (this.state.email === "")
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
            name="email"
            onChange={this.handleChange} 
            value={this.state.email} 
            placeholder="Type the user's email">
          </input>
          <br />
          <label>Password</label>
          <input 
            type="password"
            name="password"
            placeholder="type the user's password" 
            value={this.state.passwd} 
            onChange={this.handleP}
            >
          </input>
          <br />
          <button disabled={!this.isValid()}>Submit</button>
        </form>

        
      </div>
    )
  }
}
