import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import { connect } from 'react-redux'

class Navega extends Component {

  logout = () => {
    this.props.noUser() 
  }

  loggedHeader = () => {
    return (
      <Nav className="mr-auto">
         <Nav.Link href="/">Home</Nav.Link>
         <Nav.Link href="/user">{this.props.userEmail} is logged </Nav.Link>
         <Button onClick={this.logout}>Logout</Button>
      </Nav>
    )
  } 

  notLoggedHeader = () => {
    return (
      <Nav className="mr-auto">
         <Nav.Link href="/">Home</Nav.Link>
      </Nav>
    )
  }

  render() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">MyProjectLogin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {this.props.userEmail ?
                  (this.loggedHeader()) :
                  (this.notLoggedHeader())
                }
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

const mapStateToProps = store => {
  return {
    userEmail: store.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navega)
