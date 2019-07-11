import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import { Button, Form, Card } from 'react-bootstrap';

class Grant extends Component {
    state = {
        email     : "",
        password  : "",
        errorMsg  : "",
        flagMsg   : ""
    }

    handleChange = e => {
      if (e.key === "Enter" && this.state.email !== "")
        this.textInput2.focus();

      this.setState({
        [e.target.name]: e.target.value
      });
    }    

    
    clearMessage = () => {
      setTimeout(() => {
        this.setState({
          errorMsg  : "",
          email     : "",
          password  : "",
          flagMsg   : ""
        })
      }, 5000);
    }


    handleSubmit = event => {
        event.preventDefault();
        if (this.state.email !== "" && this.state.password !== "") {
          const url = "http://localhost:3333/admin/changePermission";
          fetch( url, {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                  user          : this.state.email,
                  adminEmail    : this.props.storeEmail,
                  adminPassword : this.state.password,
                  action        : "grant"
                })
          })
          .then(response => response.json())
          .then((resJSON) => {
            if ( 'message' in resJSON){
              this.setState({
                errorMsg  : resJSON.message,
                flagMsg   : "NOK" });
              this.clearMessage();
              this.textInput1.focus();
            }
            else {
              // ToDo: set focus on email field
              this.setState({
                  errorMsg  : `User ${resJSON.email} has granted Admin Permission!`,
                  flagMsg   : "OK" });
              this.clearMessage();
              this.textInput1.focus();
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({
              errorMsg  : error.message,
              flagMsg   : "NOK" });
            this.clearMessage();
            this.textInput1.focus();
          })
        }
    }

  isAdmin = () => {
    return (
      <div className="moldura">
        <h1>Grant Admin Permission</h1>
          <Card>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Email to be granted</Form.Label>
                <Form.Control
                  autoFocus   = {true}
                  type        = "email"
                  placeholder = "Type the user's email"
                  name        = "email"
                  onChange    = {this.handleChange}
                  value       = {this.state.email}
                  onKeyPress  = {this.handleChange}
                  ref         = {input => this.textInput1 = input }
                />
              </Form.Group>
  
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Your Admin Password</Form.Label>
                <Form.Control
                  type        = "password"
                  placeholder = "Password"
                  name        = "password"
                  value       = {this.state.password}
                  onChange    = {this.handleChange}
                  ref         = {input => this.textInput2 = input}
                />
              </Form.Group>
              
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </Form>
          </Card>
        </div>
      )
  }

  isNotAdmin = () => {
    return <Home />
  }

  render() {
    return (
      <div>
        {this.props.storeAdmin ?
          (this.isAdmin()) :
          (this.isNotAdmin())
        }
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    storeAdmin: store.userAdmin,
    storeEmail: store.email,
  }
}
  

export default connect(mapStateToProps, null)(Grant)
