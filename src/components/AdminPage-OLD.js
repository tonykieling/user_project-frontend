import React, { Component } from 'react';
import {Button, Card, Form, Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';


class UserPage extends Component {
  state = {
    name: this.props.storeName,
    email: this.props.storeEmail,
    userAdmin: this.props.storeUserAdmin,
    userActive: this.props.storeUserActive,
    disable: true
  }

  handleEdit = event => {
    event.preventDefault();
    this.setState({
      disable: false
    });

  }

  handleSave = event => {
    console.log("SAVE");

  }

  handleChange = event => {
    //need to check about empty fiels
    // console.log(`${[event.target.name]}: ${event.target.value}`)
    // console.log("type", event.type)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    console.log("userpage handlesubmit");
  }

  render() {
    return (
      <div className="moldura">
        <h1>Admin Page</h1>
        <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm={2}>Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="User's name"
                name="name"
                disabled={this.state.disable}
                onChange={this.handleChange}
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
                value={this.state.email}/>
            </Col>
          </Form.Group>

          <div>
            <span>User Admin: </span>
            <input type="radio" name="userAdmin" id="userAdminTrue"
              // value="true" 
              disabled={this.state.disable} onChange={this.handleChange}
              checked={(this.props.storeUserAdmin) ? true : null} />
            <label>true</label>
            <input type="radio" name="userAdmin" id="userAdminFalse"
              // value="false" 
              disabled={this.state.disable} onChange={this.handleChange}
              checked={(!this.props.storeUserAdmin) ? true : null} />
            <label>false</label>
          </div>
          <div>
            <span>User Active: </span>
            {console.log("active store:", this.state.userActive)}
            <input type="radio" name="userActive"  id="userActiveTrue" 
              value={true}
              disabled={this.state.disable} onClick={this.handleChange}
              checked={(this.state.userActive) ? true : null} />
            <label>true</label>
            <input type="radio" name="userActive" id="userActiveFalse" 
              value={false}
              disabled={this.state.disable} onClick={this.handleChange}
              checked={(!this.state.userActive) ? true : null} />
            <label>false</label>
          </div>
          
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
    )
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
