import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux'
// import { checkUser } from './database/databaseAPI'
// import { Redirect } from 'react-router-dom'


class Home extends Component {

    state = {
      email: "",
      password: "",
      errorMsg: ""
    }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  // handleSubmit = e => {
  //   e.preventDefault();
  //   const user = checkUser({email: this.state.email, password: this.state.password})
  //   if (!user) {
  //     window.alert("Email/Password is wrong!");
  //     this.setState({
  //       email: "",
  //       password: ""
  //     })
  //     return;
  //   } else {
  //     this.props.dispatchLogin({user})
  //   }
  // }

  isValid = () => {
    if (this.state.email === "" || this.state.password === "")
      return false;
    return true;
  }

  handleSubmit = event => {
      event.preventDefault();

      const url = "http://localhost:3333/login";
      fetch( url, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
              email: this.state.email,
              password: this.state.password
            })
      })
      .then(response => response.json())
      .then((resJSON) => {
        if ('name' in resJSON){
          const user = resJSON;
          this.props.dispatchLogin({user})
        }
        else if ( 'message' in resJSON){
          this.setState({
            errorMsg: resJSON.message,
            email: "",
            password: ""
          });

          //it calls a function focus on the desired field to be focused
          this.textInput.focus();

          //it clears the error message
          setTimeout(() => {
            this.setState({
              errorMsg: ""
            })
          }, 3500);

        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({errorMsg: error.message});
      })
  }


  render() {
    return (
      <div className="moldura">
        <h1>Login Page</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User / Email address</Form.Label>
              <Form.Control
                autoFocus   = {true}
                ref         = {input => this.textInput = input }
                type        = "email"
                placeholder = "Type the user's email"
                name        = "email"
                onChange    = {this.handleChange}
                value       = {this.state.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type        = "password"
                placeholder = "Password"
                name        = "password"
                value       = {this.state.password}
                onChange    = {this.handleChange}
              />
              <p id="errorMsg">{ this.state.errorMsg }</p>
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
    dispatchLogin: user => dispatch({type:"LOGIN", data: user })
  }
};

export default connect(null, mapDispatchToProps)(Home);
