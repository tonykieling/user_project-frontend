import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import {Button, Form} from 'react-bootstrap';

///////////////////////////////////////////////////////////////////////////////////////
// ToDo:
//  form style
//  set focus on admin emails
///////////////////////////////////////////////////////////////////////////////////////
class Seize extends Component {
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
  
    clearMessage = () => {
      setTimeout(() => {
        this.setState({
          errorMsg: "",
          email: "",
          password: ""
        })
      }, 5000);
    }

    handleSubmit = event => {
        event.preventDefault();
        const url = "http://localhost:3333/admin/changePermission";
        fetch( url, {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
                user: this.state.email,
                adminEmail: this.props.storeEmail,
                adminPassword: this.state.password,
                action: "seize"
              })
        })
        .then(response => response.json())
        .then((resJSON) => {
          if ( 'message' in resJSON){
            this.setState({errorMsg: resJSON.message});
            this.clearMessage();
          }
          else {
            // ToDo: set focus on email field
            this.setState({
                errorMsg: `User ${resJSON.email} has no longer Admin Permission!`
              });
            this.clearMessage();
            // setTimeout(() => {
            //   this.setState({
            //     errorMsg: "",
            //     email: "",
            //     password: ""
            //   })
            // }, 7000);
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({errorMsg: error.message});
          this.clearMessage();
        })
    }    

  isAdmin = () => {
    return (
        <div className="moldura">
          <h1>Seize Admin Permission</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Admin Email to be seized</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Type the user's email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Form.Group>
  
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Your Admin Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
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
  

export default connect(mapStateToProps, null)(Seize)
