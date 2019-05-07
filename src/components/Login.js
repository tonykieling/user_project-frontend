import Nav from './Nav.js'
import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  
  handleChange = e => {
    // console.log(`${e.target.name}: ", ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    if (!this.props.checkPasswd({email: this.state.email, password: this.state.password})) {
      console.log('Error!!')
      console.log("e.target: ", e.target);
      console.log("this.state: ", this.state)
    }
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
            onChange={this.handleChange}
            >
          </input>
          <br />
          <button disabled={!this.isValid()}>Submit</button>
        </form>

        
      </div>
    )
  }
}
