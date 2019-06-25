import React, { Component } from 'react';
import {Button, Card, Form, Col, Row, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';


class UserPage extends Component {
  state = {
    name: this.props.storeName,
    email: this.props.storeEmail,
    disable: true,
    errorMsg: ""
  }

  handleEdit = event => {
    event.preventDefault();
    this.setState({
      disable: false
    });
  }

  handleSave = event => {
    // event.preventDefault();
    if ((this.state.name !== this.props.storeName) || (this.state.email !== this.props.storeEmail)) {
      const url = "http://localhost:3333/user";
      fetch( url, {  
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
              actualEmail: this.props.storeEmail,
              name: this.state.name,
              email: this.state.email
            })
      })
        .then(response => response.json())
        .then((resJSON) => {
          if ('name' in resJSON){
            const user = {
              id: resJSON.id,
              name: resJSON.name,
              email: resJSON.email,
              userAdmin: resJSON.user_admin,
              userActive: resJSON.user_active
            }; 
            this.props.dispatchLogin({user});
          }
          else if ('message' in resJSON){
            this.setState({errorMsg: resJSON.message});  
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({errorMsg: error.message});
        })
    }
  }

  handleChange = event => {
    //need to check about empty fields
    // if (event.target)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handles = e => {
    // console.log("e.key-->", e.key)
    if (e.key === "Enter")
      this.handleSave();
  }


  render() {
    return (
      <div className="moldura">
        <h1>User Page</h1>
        <Card>
        <Form>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm={2}>Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="User's name"
                name="name"
                disabled={this.state.disable}
                onChange={this.handleChange}
                onKeyPress={this.handles}
                value={this.state.name}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                disabled={this.state.disable}
                placeholder="Users' email"
                name="email"
                onChange={this.handleChange}
                onKeyPress={this.handles}
                value={this.state.email}/>
            </Col>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" onClick={this.handleEdit}>
              Edit Data
            </Button>
            <Button variant="success" type="submit" onClick={this.handleSave}>
              Save
            </Button>
          </div>

        </Form>
        </Card>
      </div>
    )}
}

const mapStateToProps = store => {
  return {
    storeName: store.name,
    storeEmail: store.email
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: user => dispatch({type:"LOGIN", data: user })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


