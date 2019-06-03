import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
//import ReactBootstrap, {Navbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import store from '../components/store/store.js'


class Navega extends Component {
  // constructor(props){
  //   super(props);
  // }

  logout = () => {
    //alert message
    //if yes
    localStorage.setItem("user", null)
    store.dispatch({"type": "LOGOUT"})
    // this.props.history.push("/")
    return <Redirect to="/"/>
    // this.context.router.history.push('/')
  }

  loggedHeader = () => {
    return (
      <Nav className="mr-auto">
         <Nav.Link href="/">Home</Nav.Link>
         <Nav.Link href="#">{this.props.userEmail} is logged </Nav.Link>
         {/* <Nav.Link href={this.logout}>Logout </Nav.Link> */}
         <Button onClick={this.logout}>Logout</Button>
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
    console.log("Nav-props: ", this.props.userEmail);
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
  } // ==================  end of RENDER  ================
} // ==================  end of COMPONENT  ================

const mapStateToProps = store => {
  return {
    userEmail: store.email
  }
}

export default connect(mapStateToProps, null)(Navega)