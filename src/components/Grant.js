import React, { Component } from 'react';
import { connect } from 'react-redux'
import Menu1 from './Menu1.js'
import Home from './Home.js'
import {Button, Form} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

class Grant extends Component {

    state = {
        email: "",
        password: "",
        errorMsg: "",
        redirectFlag: false
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }    
  

    handleSubmit = event => {
        event.preventDefault();
  
        const url = "http://localhost:3333/grant";
        fetch( url, {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
                user: this.state.email,
                admin: this.props.storeEmail,
                password: this.state.password
              })
        })
        .then(response => response.json())
        .then((resJSON) => {
          // console.log('user data coming from server >>>>> ', resJSON);  
          if ( 'message' in resJSON){
            this.setState({errorMsg: resJSON.message});  
          }
          else {
            const user = resJSON;
            this.setState({
                redirectFlag: true
              });
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
          <h1>Grant Admin Page</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Email address</Form.Label>
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
    if (this.state.redirectFlag)
      return(<Redirect to="/menu1" />);

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
