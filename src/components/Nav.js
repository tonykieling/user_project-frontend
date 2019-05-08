import React, { Component } from 'react'

export default class Nav extends Component {
  
  loggedHeader = () => {
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{marginLeft: "10%"}}>{this.props.email} is logged</span>
        <span style={{marginRight: "10%"}}>Logout</span>
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
        {this.props.email ?
          (this.loggedHeader()) :
          (<h4>Login</h4>)
        }
      </div>
    )
  }
}
