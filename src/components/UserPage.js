import React, { Component } from 'react'
import store from './store/store.js'
import {Button, Card} from 'react-bootstrap'
const {checkUser} = require('./database/databaseAPI')


export default class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "Test Rod",
      userstatus: "Active",
      usertype: "Standard",
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    const user = checkUser({email: this.state.email, password: this.state.password})
    if (!user) {
      alert("Email/Password is wrong!");
      this.setState({
        email: "",
        password: ""
      })
      return;
    } else {
      store.dispatch({type: "LOGIN", data: { user }})
      console.log("login is valid!")
      this.props.history.push("/")
    }
  }

  isValid = () => {
    if (this.state.email === "" || this.state.password === "")
      return false;
    return true;
  }

  render() {
    return (
      <div className="moldura">
        <h1>User Page</h1>

        <Card>
          <Card.Body>
            <Card.Title>{ this.state.username }</Card.Title>
            <img src={require("../img/userphoto.png")} alt="user" />
            <Card.Text>{ this.state.userstatus }</Card.Text>
            <Card.Text>{ this.state.usertype }</Card.Text>
            <Button variant="secondary" href="/">Close</Button>
          </Card.Body>
        </Card>

      </div>
    )
  }
}
