import React, { Component } from 'react'

export default class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{marginLeft: 50, marginTop: 80}}>
          <label>Email: </label> <br />
          <input
            type="text"
            onChange={this.handleChange}
            name="email"
            placeholder="type the user's email"
            value={this.state.email}
          /> <br /> <br />

          <label>Password: </label> <br />
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            placeholder="type the user's password"
            value={this.state.email}
          /> <br /> <br />

          <label>Confirm password: </label> <br />
          <input
            type="password"
            onChange={this.handleChange}
            name="confirm_password"
            placeholder="confirm the password"
            value={this.state.email}
          />

          <br /> <br /> <br />
          <button> Create User </button>
        </form>
      </div>
    )
  }
}
