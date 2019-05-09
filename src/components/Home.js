import React, { Component } from 'react';
import Landing from './Landing.js'

export class Home extends Component {
  constructor(props) {
    super(props)
  }
  noUserLogged = () => {
    // return <h2 style={{ display: "flex", justifyContent: "center", color: "red"}}>No user</h2>
    return <Landing />
  }

  userLogged = () => {
    return <h2 style={{ display: "flex", justifyContent: "center", color:"blue"}}>Welcome {this.props.email}</h2>
  }

  render() {
    console.log("HOME-this.props: ", this.props.userLogged)

    return (
      <div>
        <h1 style={{ display: "flex", justifyContent: "center"}}> Home Page (anyways)</h1> <br /> <br />
        {this.props.userLogged ?
          (this.userLogged()) :
          (this.noUserLogged())
        }
      </div>
    )
  }
}

export default Home
