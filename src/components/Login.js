import React, { Component } from 'react'
import store from './store/store.js'
import {Button, Form} from 'react-bootstrap'
const {checkUser} = require('./database/databaseAPI')


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    const user = checkUser({email: this.state.email, password: this.state.password})
    if (!user) {
      alert("Email/Password is wrong!");
      this.setState({
        email: "",
        password: ""
      })
      return;
    } else {
      store.dispatch({type: "LOGIN", data: { user }})
      this.props.history.push("/user")
      console.log("login is valid!")
    }
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
