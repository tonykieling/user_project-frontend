import React, { Component } from 'react'
import Landing from './Landing.js';
import Login from './Login.js';
// import store from './store/store.js'
import {Button, Form} from 'react-bootstrap'
const {addUser, viewUser} = require('./database/databaseAPI')


export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

  handleSubmit = e => {
      e.preventDefault();
      if (!addUser({ name: this.state.name, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword })) {
        // checks in the database if user already exists
        alert("User already exists! Please use another email.");
        this.props.history.push("/login")
        return;


      } else {
        console.log(`User ADDED to DATABASE!!!! LOAD SOME PAGE`);
        this.props.history.push("/confirm")
        return;
      }
    }

  // isValid = () => {
  //   if (this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "")
  //     return false;
  //   return true;
  // }


  render() {
    return (
      <div className="moldura">
        <h1>Register Page</h1>
            <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type the user's name"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User / Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Type the user's email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>

            </Form>

      </div>
    )
  }
}
