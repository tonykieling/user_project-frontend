import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import {Button, Form} from 'react-bootstrap';

///////////////////////////////////////////////////////////////////////////////////////
// ToDo:
//  form style
//  set focus on admin emails
///////////////////////////////////////////////////////////////////////////////////////
class Grant extends Component {
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
          }
          else {
            // ToDo: set focus on email field
            this.setState({
                errorMsg: `User ${resJSON.email} is no longer an Admin User`
              });
            setTimeout(() => {
              this.setState({
                errorMsg: "",
                email: "",
                password: ""
              })
            }, 3500);
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({errorMsg: error.message});
        })
    }    

  isAdmin = () => {
    return (
        <div className="moldura">
          <h1>Seize Admin Page</h1>
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
                <Form.Label>Admin Password</Form.Label>
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
  

export default connect(mapStateToProps, null)(Grant)
