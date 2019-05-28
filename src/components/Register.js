import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  // validateForm() {
  //     return (
  //       this.state.email.length > 0 &&
  //       this.state.password.length > 0 &&
  //       this.state.password === this.state.confirmPassword
  //     );
  //   }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  isValid = e => {
    if (this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "")
      return true;
    return false;
  }

  handleSubmit = async e => {
    e.preventDefault();
  }

  handleConfirmationSubmit = async e => {
    e.preventDefault();
  }

  // NEED TO DO ISvALID
  // isValid

  render() {
    return (
      <div className="moldura">
        <h1>Register Page</h1>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User / Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Type the user's email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
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
