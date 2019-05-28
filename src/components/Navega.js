import React, { Component } from 'react'
//import { Link } from "react-router-dom"
import {Navbar, Nav} from 'react-bootstrap'
//import ReactBootstrap, {Navbar} from 'react-bootstrap'

export default class Navega extends Component {

  loggedHeader = () => {
    return (
      <Nav className="mr-auto">
         <Nav.Link href="/">Home</Nav.Link>
         <Nav.Link href="#">{this.props.email} is logged</Nav.Link>
      </Nav>
    )
  }  // ==================  end of LOGGED  ================

  notLoggedHeader = () => {
    return (
      <Nav className="mr-auto">
         <Nav.Link href="/">Home</Nav.Link>
      </Nav>
    )
  }  // ==================  end of NOT LOGGED  ================

  render() {
    console.log("Nav-props: ", this.props);
    return (

        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">MyProjectLogin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {this.props.userLogged ?
                  (this.loggedHeader()) :
                  (this.notLoggedHeader())
                }
            </Navbar.Collapse>
        </Navbar>
    )
  } // ==================  end of RENDER  ================
} // ==================  end of COMPONENT  ================
