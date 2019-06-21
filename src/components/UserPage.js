import React, { Component } from 'react';
import {Button, Card} from 'react-bootstrap';
import { connect } from 'react-redux';


class UserPage extends Component {
  render() {
    console.log("storeXP: ", this.props);

    if(this.props.userAdmin) {
      return (
        <div className="moldura">
          <h1>User Page</h1>
          <Card>
            <Card.Body>
              <Card.Title>Name: { this.props.storeName }</Card.Title>
              <Card.Text>Email: { this.props.storeEmail }</Card.Text>
                <div className="cardDetails">
                  <div className="cardLeft">
                    <img src={require("../img/userphoto.png")} alt="user" />
                  </div>
                  <div className="cardRight">
                    <Card.Text>Status: { this.props.storeUserActive ? "Active" : "Inactive" }</Card.Text>
                    <Card.Text>User Type: { this.props.storeType === "true" ? "Admin" : "Normal" }</Card.Text>
                    <Button variant="secondary" href="/">Close</Button>
                  </div>
                </div>
            </Card.Body>
          </Card>
        </div>
      )
    } else {
      return (
        <div className="moldura">
          <h1>User Page</h1>
          <Card>
            <Card.Body>
              <Card.Title>Name: { this.props.storeName }</Card.Title>
              <Card.Text>Email: { this.props.storeEmail }</Card.Text>
                <div className="cardDetails">
                  <div className="cardLeft">
                    <img src={require("../img/userphoto.png")} alt="user" />
                  </div>
                  <div className="cardRight">
                    <Button variant="secondary" href="/">Close</Button>
                  </div>
                </div>
            </Card.Body>
          </Card>
        </div>
      )
    }
  }
}

const mapStateToProps = store => {
  console.log("store::", store);
  return {
    storeName: store.name,
    storeEmail: store.email,
    storeUserAdmin: store.userAdmin,
    storeUserActive: store.userActive
  }
};

export default connect(mapStateToProps, null)(UserPage);
