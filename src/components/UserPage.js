import React, { Component } from 'react';
import {Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';


class UserPage extends Component {
  handleSubmit = () => {
    console.log("userpage handlesubmit");
  }

  render() {
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

const mapStateToProps = store => {
  return {
    storeName: store.name,
    storeEmail: store.email
  }
};

export default connect(mapStateToProps, null)(UserPage);
