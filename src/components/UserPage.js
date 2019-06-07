import React, { Component } from 'react'
// import store from './store/store.js'
import {Button, Card} from 'react-bootstrap'
import { connect } from 'react-redux'


class UserPage extends Component {

  render() {

    console.log('get props TYPE >>> ', this.props.storeType)
    console.log('get props NAME >>> ', this.props.storeName)

    return (
      <div className="moldura">
        <h1>User Page</h1>

        <Card>
          <Card.Body>
            <Card.Title>Name: { this.props.storeName }</Card.Title>
              <div className="cardDetails">
                <div className="cardLeft">
                    <img src={require("../img/userphoto.png")} alt="user" />
                </div>
                <div className="cardRight">
                    <Card.Text>Status: Active</Card.Text>
                    <Card.Text>Type: { eval(this.props.storeType) ? "Admin" : "Normal" }</Card.Text>
                    {console.log("TYPEOF::::::::::::::::: ", eval(this.props.storeType))}
                    <Button variant="secondary" href="/">Close</Button>
                </div>
              </div>
          </Card.Body>
        </Card>

      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    storeName: store.name,
    storeType: store.userAdmin
  }
}


export default connect(mapStateToProps, null)(UserPage)
