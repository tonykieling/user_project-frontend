import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
//import ReactBootstrap, {Navbar} from 'react-bootstrap'
import { connect } from 'react-redux'
// import { Redirect } from "react-router-dom";
// import store from '../components/store/store.js'


class Navega extends Component {
  // constructor(props){
  //   super(props);
  // }

  logout = () => {
    // 
    // insert confirmation popup
    //alert message
    // console.log("BEFORE logout this.props== ", this.props)
    this.props.noUser() 
    // console.log("logout")
    // console.log("AFTER logout this.props== ", this.props)
    // return <Redirect to="/user" />
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
  }  // ==================  end of NOT LOGGED  ================

  render() {
    // console.log("Nav-props: ", this.props.userEmail);

    return (

        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">MyProjectLogin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {console.log("this.props.userEmail:: ", this.props.userEmail)}
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
  // console.log("store:: ", store)
  return {
    userEmail: store.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
    // noUser: () => dispatch({type:"NO_USER", data: ""})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navega)
