import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'

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
    console.log("Login-: ", this.props);
    // const result = this.props.checkUser();
    if (!this.props.checkUser({email: this.state.email, password: this.state.password})) {
      alert("Email/Password is wrong!");
      this.setState({
        password: "",
        email: ""
      })
      return;
    }
    console.log("OK!!!!");
  }

  isValid = () => {
    if (this.state.email === "" || this.state.password === "")
      return false;
    return true;
  }

  render() {
    return (
      <div className="moldura">
        <h1>Login Page</h1>      
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User / Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Type the user's email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
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

                <Button variant="primary" type="submit">
                  Submit
                </Button>

            </Form>

      </div>
    )
  }
}
