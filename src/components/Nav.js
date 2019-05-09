import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Nav extends Component {
  
  loggedHeader = () => {
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{marginLeft: "10%"}}>{this.props.email} is logged</span>
        <Link to={"/"}>Home</Link>
        <span style={{marginRight: "10%"}}>Logout</span>
      </div>
    )
  }

  notLoggedHeader = () => {
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        {/* <span style={{marginLeft: "10%"}}>Login</span> */}
        
        <Link to={"/login"} style={{marginLeft: "10%"}}>Login</Link>
        <span style={{marginRight: "10%"}}>Register</span>
      </div>
    )
  }

  render() {
    console.log("props: ", this.props);
    return (
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
    )
  }
}
