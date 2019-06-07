import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import { connect } from 'react-redux'

class Navega extends Component {

  logout = () => {
    //
    // add popup to confirm the logout action
    //

    this.props.noUser()
  }

  loggedHeader = () => {
    return (
      <Nav className="mr-auto loggedNavega">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/user">{this.props.storeEmail} is logged </Nav.Link>
        <Button onClick={this.logout}>Logout</Button>
      </Nav>
    )
  } 

  notLoggedHeader = () => {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {/* //
        // add button to Login
        // add button to Register
        // */}
      </Nav>
    )
  }


  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">MyProjectLogin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {this.props.storeEmail ?
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
    storeEmail: store.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navega)
