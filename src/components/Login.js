import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkUser } from './database/databaseAPI'


class Home extends Component {

    state = {
      email: "",
      password: ""
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
      this.props.dispatchLogin({user})
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: (user) => dispatch({type:"LOGIN", data: user })
  }
}

export default connect(null, mapDispatchToProps)(Home)
