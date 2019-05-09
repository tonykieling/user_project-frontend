// import Nav from './Nav.js'
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
      console.log('Error!!');
      alert("Email/Password is wrong!");
      this.setState({
        password: "",
        email: ""
      })
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
        {/* <Nav /> */}

        <form onSubmit={this.handleSubmit} style={{marginLeft: 50, marginTop: 80}}>
          <label>User</label> <br />
          <input 
            type="text"
            name="email"
            onChange={this.handleChange} 
            value={this.state.email} 
            placeholder="Type the user's email">
          </input>
          <br /> <br />

          <label>Password</label> <br />
          <input 
            type="password"
            name="password"
            placeholder="type the user's password" 
            value={this.state.password} 
            onChange={this.handleChange}
            >
          </input>
          <br /> <br />

          <button disabled={!this.isValid()}>Submit</button>
        </form>

        
      </div>
    )
  }
}
