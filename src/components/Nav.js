import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class Nav extends Component {
  
  loggedHeader = () => {
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{marginLeft: "10%"}}>{this.props.email} is logged</span>
        <span style={{marginRight: "10%"}}>Logout</span>
      </div>
    )
  }

  notLoggedHeader = () => {
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{marginLeft: "10%"}}>Login</span>
        {/* <a href  */}
        {/* <Link to={} */}
        <span style={{marginRight: "10%"}}>Register</span>
      </div>
    )
  }

  render() {
    console.log("props: ", this.props);
    return (
      <Router>
        <div style={{position: "sticky", backgroundColor: "darkseagreen"}}>
          <p style={{color: "red", fontSize: 25, fontStyle: "bold", display: "flex", 
          justifyContent: "center", marginTop: 0}}>
            This is Nav component
          </p>
          {this.props.userLogged ?
            (this.loggedHeader()) :
            (this.notLoggedHeader())
          }
        </div>
      </Router>
    )
  }
}
