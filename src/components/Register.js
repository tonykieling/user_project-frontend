import React, { Component } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Register extends Component {

  state = {
      name            : "",
      email           : "",
      password        : "",
      confirmPassword : "",
      redirectFlag    : false,
      errorMsg        : ""
    }

  handleChange = e => {
    if (e.key === "Enter")
      switch(e.target.name) {
        case "name":
          if (this.state.name !== "")
            this.textInput2.focus();
          break;
        case "email":
          if (this.state.email !== "")
            this.textInput3.focus();
          break;
        case "password":
          if (this.state.password !== "")
            this.textInput4.focus();
          break;
        default:
                                            
      }

    this.setState({
      [e.target.name]: e.target.value
    });
    }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.email !== "" && this.state.name !== "" && this.state.password !== "" && this.state.confirmPassword !== "") {
      if (this.state.password !== this.state.confirmPassword) {
        alert("Password and \nConfirm Password fields\n\nMUST be the same.");
        this.setState({
          password        : "",
          confirmPassword : ""
        })
        this.textInput3.focus();
      } else {      
        const url = "http://localhost:3333/user/new";
        fetch( url, {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
              })
        })
          .then(response => response.json())
          .then((resJSON) => {
            console.log('user data coming from server >>>>> ', resJSON);  
            if ('name' in resJSON){
              // const user = resJSON;
              const user = {
                id          : resJSON.id,
                name        : resJSON.name,
                email       : resJSON.email,
                pictureName : resJSON.picture_name || "defaultPicture.jpg",
                userAdmin   : resJSON.user_admin,
                userActive  : resJSON.user_active
              }; 
              console.log("user after", user);
              this.props.dispatchLogin({user});
              this.setState({
                redirectFlag: true
              });
            }
            else if ( 'message' in resJSON){
              this.setState({errorMsg: resJSON.message});  
              this.clearMessage();
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({errorMsg: error.message});
          })
      }
    }
  }


  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        errorMsg        : "",
        name            : "",
        email           : "",
        password        : "",
        confirmPassword : "",
        flagMsg         : ""
      })
      this.textInput1.focus();
    }, 3500);

  }

  render() {

    if (this.state.redirectFlag)
      return(<Redirect to="/user" />);

    return (
      <div className="moldura">
        <h1>Register Page</h1>
        <Card className="twothirds">
          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus   = {true}
                type        = "text"
                placeholder = "Type the user's name"
                name        = "name"
                onChange    = {this.handleChange}
                value       = {this.state.name}
                onKeyPress  = {this.handleChange}
                ref         = {input => this.textInput1 = input }
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>User / Email address</Form.Label>
              <Form.Control
                type        = "email"
                placeholder = "Type the user's email"
                name        = "email"
                onChange    = {this.handleChange}
                value       = {this.state.email}
                onKeyPress  = {this.handleChange}
                ref         = {input => this.textInput2 = input }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type        = "password"
                placeholder = "Password"
                name        = "password"
                onChange    = {this.handleChange}
                value       = {this.state.password}
                onKeyPress  = {this.handleChange}
                ref         = {input => this.textInput3 = input }
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type        = "password"
                placeholder = "Confirm Password"
                name        = "confirmPassword"
                onChange    = {this.handleChange}
                value       = {this.state.confirmPassword}
                onKeyPress  = {this.handleChange}
                ref         = {input => this.textInput4 = input }
                />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Container>
              {this.state.errorMsg}
            </Container>
          </Form>
          </Card>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: user => dispatch({type:"LOGIN", data: user })
  }
}

export default connect(null, mapDispatchToProps)(Register)
