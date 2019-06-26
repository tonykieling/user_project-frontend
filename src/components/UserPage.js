import React, { Component } from 'react';
import {Button, Card, Form, Col, Row, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';


class UserPage extends Component {
  state = {
    name: this.props.storeName,
    email: this.props.storeEmail,
    disable: true,
    disablePassword: true,
    confNewPassword: "",
    newPassword: "",
    currentPassword: "",
    errorMsg: "",
    errorMsgPassword: "",
    flagMsg: ""
  }

  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        errorMsg: "",
        flagMsg: "",
        disable: true
      })
    }, 5000);
  }

  handleEdit = event => {
    event.preventDefault();
    if (event.target.name === "btnPasswd")
      this.setState({ disablePassword: false });
    else 
    this.setState({ disable: false });
  }


  handleSave = event => {
    event.preventDefault();
    let bodyData = "";

    if (event.target.name === "btnPasswd")  {
  console.log("save new password: ", this.state);
      if (this.state.newPassword === this.state.confNewPassword) {
      console.log("change passworddddddddddddd")
        bodyData = JSON.stringify({
          currentPassword: this.state.currentPassword,
          newPassword: this.state.newPassword,
          actualEmail: this.props.storeEmail
        });
      } else {
        console.log("different passwords!!!!!!!!!!!!!!!!!");
        return;
      }
    } else if ((this.state.name !== this.props.storeName) || (this.state.email !== this.props.storeEmail)) {
      bodyData =  JSON.stringify({
        actualEmail: this.props.storeEmail,
        name: this.state.name,
        email: this.state.email
      })
    } else {
    console.log("different USER DATA!!!!!!!!!!!!!!!!!"); 
      return;
    }
    
    const url = "http://localhost:3333/user";
      fetch( url, {  
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: bodyData
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
            if ('actualEmail' in JSON.parse(bodyData))
              this.setState({
                errorMsg: "Data updated successfully!",
                flagMsg: "OK"});
            else
              this.setState({
                errorMsgPassword: "Password has been changed successfuly!",
                flagMsg: "OK"});
            this.clearMessage();
          }
          else if ('message' in resJSON){
            console.log("received from server: ", resJSON)
            this.setState({
              errorMsg: resJSON.message,
              flagMsg: "NOK"});
            this.clearMessage();
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errorMsg: error.message,
            flagMsg: "NOK"});
          this.clearMessage();
        })
    
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
    //////////////////////////////////////////////////////////
    // ToDo: when enter in the new password fields, jump to the next field
    //////////////////////////////////////////////////////////
    if (e.key === "Enter")
      this.handleSave();
  }


  render() {
    return (
      <div className="moldura">
        <h1>User's Page</h1>

        {/* user data Card */}
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

              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </div>

          </Form>
        </Card>

        {/* password card */}
        <Card>
          <Form className="margins">
            <Form.Group as={Row} controlId="formCurrentPasswd">
            <Form.Label column sm={2}>Current</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Current password"
                  name="currentPassword"
                  disabled={this.state.disablePassword}
                  onChange={this.handleChange}
                  onKeyPress={this.handles}
                />
              </Col>
            </Form.Group>

          <Form.Group as={Row} controlId="formNewPasswd">
            <Form.Label column sm={2}>New</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="New password"
                name="newPassword"
                disabled={this.state.disablePassword}
                onChange={this.handleChange}
                onKeyPress={this.handles}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formConfNewPasswd">
            <Form.Label column sm={2}>Confirm</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                disabled={this.state.disablePassword}
                placeholder="Confirm new password"
                name="confNewPassword"
                onChange={this.handleChange}
                onKeyPress={this.handles}
              />
            </Col>
            <p id="errorMsg">{ this.state.errorMsgPassword }</p>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" onClick={this.handleEdit} name="btnPasswd">
              Change Password
            </Button>
            <Button variant="success" type="submit" onClick={this.handleSave} name ="btnPasswd">
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


