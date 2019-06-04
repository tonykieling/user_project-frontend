import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Landing extends Component {
  render() {
    return (
      <div className="moldura">

        <h1>Landing Page</h1>
        <div className="landingButtons">

              <Link to={"/login"} className="boxLanding">Login</Link>
              <Link to={"/register"} className="boxLanding">Register</Link>
              <Link to={"/logout"} className="boxLanding">Logout</Link>
              <Link to={"/change"} className="boxLanding">Change</Link>
              <Link to={"/grant"} className="boxLanding">Grant</Link>
              <Link to={"/logbook"} className="boxLanding">LogBook</Link>
              <Link to={"/user"} className="boxLanding">User</Link>
        </div>
      </div>
    )
  }
}
