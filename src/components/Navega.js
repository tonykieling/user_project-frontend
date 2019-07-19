import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import 'font-awesome/css/font-awesome.min.css'; 


class Navega extends Component {

  state = {
    menu_class: ''
  }

  setToggleTopMenuClass = () => {
    if (this.state.menu_class === '') {
        this.setState({
            menu_class: 'toggled',
        })
    } else {
        this.setState({
            menu_class: '',
        })
    }
  }

  logout = () => {
    //if (window.confirm("Are you sure you wanna leave?"))
      this.props.noUser()
  }


  loggedHeader = () => {

    let toggled_class = `mr-auto ${this.state.menu_class}`;
    if (this.props.storeUserAdmin === true) {
      return (
        
        <Navbar bg="success" variant="success">
          <Navbar.Brand href="/" >LoginJS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={toggled_class}  >
              <Nav.Link href="/user">{this.props.storeEmail} is logged </Nav.Link>
              {/* <NavDropdown title="Admin tasks" id="nav-dropdown"> */}
              <NavDropdown title="Admin tasks" id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="4.4" href="/listUsers">List Users & Admins</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" href="/grant">Grant Admin Permission</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" href="/seize">Seize Admin Permission</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3" href="/searchlog">Search Log</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Button onClick={this.logout} variant="success" className="logoutBtn">Logout</Button>
              <Nav.Link href="/user">
                <Image src={require("../img/" + this.props.storePictureName)} className="pictureIcon" roundedCircle={true}></Image>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
        </Navbar>
      )
    } else {
      return (
        <Navbar bg="primary" variant="primary">
          <Navbar.Brand href="/">LoginJS</Navbar.Brand>
          <Nav className={toggled_class}  >
            {/* <Nav.Link href="/user">{this.props.storeEmail} is logged </Nav.Link> */}
            <Link to="/user" className="nav-link">{this.props.storeEmail} is logged</Link>
            <Button onClick={this.logout} className="logoutBtn">Logout</Button>
            <Nav.Link href="/user">
              <Image src={require("../img/" + this.props.storePictureName)} className="pictureIcon" roundedCircle={true}></Image>
            </Nav.Link>
          </Nav>
          <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
        </Navbar>
      )
    }
  }


  notLoggedHeader = () => {
    let toggled_class = `notlogged mr-auto ${this.state.menu_class}`;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">LoginJS</Navbar.Brand>
        <Nav className={toggled_class}  >
          {/* <Nav.Link href="/login">Login</Nav.Link> */}
          <Link to="/login" className="nav-link">Login</Link>
          {/* <Nav.Link href="/register">Register</Nav.Link> */}
          <Link to="/register" className="nav-link">Register</Link>
        </Nav>
        <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
      </Navbar>
    )
  }


  render() {
    return(this.props.storeEmail ?
            this.loggedHeader() :
            this.notLoggedHeader()
          );
  }
}

const mapStateToProps = store => {
  return {
    storeEmail        : store.email,
    storeUserAdmin    : store.userAdmin,
    storePictureName  : store.pictureName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navega);
