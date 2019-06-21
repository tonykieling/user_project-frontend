import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import { connect } from 'react-redux'

class Navega extends Component {

  logout = () => {
    //if (window.confirm("Are you sure you wanna leave?"))
      this.props.noUser()
  }

  loggedHeader = () => {
    console.log("this.props", this.props);
    if (this.props.storeUserAdmin === true || this.props.storeUserAdmin === "true") {
      console.log(`${this.props.storeEmail} is an Admin user`);
      return (
        <Nav className="mr-auto">
          <Nav.Link href="/user">{this.props.storeEmail} is logged </Nav.Link>
          <NavDropdown title="Dropdown" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1" href="/menu1">Menu1</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">
              Something else here
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Button onClick={this.logout}>Logout</Button>
        </Nav>
      )
    } else {
      console.log(`${this.props.storeEmail} is NOT an Admin user`);
      return (
        <Nav className="mr-auto">
          <Nav.Link href="/user">{this.props.storeEmail} is logged </Nav.Link>
          <Button onClick={this.logout}>Logout</Button>
        </Nav>
      )
    }
  }


  notLoggedHeader = () => {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    )
  }


  render() {
    return (
      <Navbar bg={this.props.storeEmail ? "primary" : "dark"} variant="dark">
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
    storeEmail: store.email,
    storeUserAdmin: store.userAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navega)
