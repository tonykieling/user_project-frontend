import React, { Component } from 'react'
import store from './store/store.js'
import {Button, Card} from 'react-bootstrap'
import { getUser } from './store/localStorage.js'
import { connect } from 'react-redux'

const {checkUser} = require('./database/databaseAPI')

const persistedData = {
  email: getUser()
}

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: persistedData.email,
      password: "",
      username: "",
      userstatus: "Active",
      usertype: ""  ,
    }
  }

  render() {
    //console.log('getUserData >>> ', store.getState())
    console.log('getUserData >>> ', store.getState())
    const userState = store.getState();
    console.log('getState >>> ', userState)

    return (
      <div className="moldura">
        <h1>User Page</h1>

        <Card>
          <Card.Body>
            <Card.Title>Name: { this.state.username }</Card.Title>
              <div className="cardDetails">
                <div className="cardLeft">
                    <img src={require("../img/userphoto.png")} alt="user" />
                </div>
                <div className="cardRight">
                    <Card.Text>Status: { this.state.userstatus }</Card.Text>
                    <Card.Text>Type: { this.state.usertype }</Card.Text>
                    <Button variant="secondary" href="/">Close</Button>
                </div>
              </div>
          </Card.Body>
        </Card>

      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store
  }
}

export default connect(mapStateToProps, null)(UserPage)
