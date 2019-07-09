import React, { Component } from 'react';
import {Button, Card, Form, Col, Row, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';


/*///////////////////////////////////////////////////////////////////////////
/////////////////////// handle enter in the fields
/////////////////////// type enters
//////////////////////  need check whether the persistence is working appropriatelly
//////////////////////    need to record in localStorage due to the admin refresh the page and lost user's data
//////////////////////
////////////////////// + fix route problem (it cannot be shown to the user, unless it's an Admin one)
*/

class AdminEditUser extends Component {
  state = {
    id                    : this.props.storeId,
    name                  : this.props.storeName,
    email                 : this.props.storeEmail,
    userAdmin             : this.props.storeUserAdmin,
    userActive            : this.props.storeUserActive,
    disableEditData       : true,
    disableEditPassword   : true,
    confNewPassword       : "",
    newPassword           : "",
    adminPassword         : "",
    dataMsg               : "",
    passwordMsg           : "",
    flagMsg               : ""
  }

  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        dataMsg             : "",
        flagMsg             : "",
        disableEditData     : true,
        passwordMsg         : "",
        disableEditPassword : true,
        newPassword         : "",
        adminPassword       : "",
        confNewPassword     : ""
      })
    }, 5000);
  }

  handleEdit = event => {
    event.preventDefault();
    if (event.target.name === "changePassword")
      this.setState({ 
        disableEditPassword : !this.state.disableEditPassword,
        disableEditData     : true });
    else if (event.target.name === "editData") {
      this.setState({ 
        disableEditData     : !this.state.disableEditData,
        disableEditPassword : true });
    }
  }


  handleSave = event => {
    event.preventDefault();
    let bodyData = "";

    if (event.target.name === "changePassword")  {
      if ((this.state.newPassword === this.state.confNewPassword) &&
       (this.state.adminPassword !== "") &&
       (this.state.newPassword !== "")) {
        bodyData = JSON.stringify({
          password      : this.state.adminPassword,
          newPassword   : this.state.newPassword,
          email         : this.props.storeEmail
        });
      } else {
        if (this.state.adminPassword === "" || this.state.newPassword === "" || this.state.confNewPassword === "")
          this.setState({
            passwordMsg       : "Password cannot be empty!",
            flagMsg           : "NOK"
          })
        else if (this.state.newPassword !== this.state.confNewPassword)
          this.setState({
            passwordMsg       : "Diff passwords!",
            flagMsg           : "NOK"
          })

        this.clearMessage();
        return;
      }
    } else if ((this.state.name !== this.props.storeName) || (this.state.email !== this.props.storeEmail) ||
              (this.state.userAdmin !== this.props.storeUserAdmin) || (this.state.userActive !== this.props.storeUserActive)) {
      bodyData =  JSON.stringify({
        actualEmail : this.props.storeEmail,
        name        : this.state.name,
        email       : this.state.email,
        userAdmin   : this.state.userAdmin,
        userActive  : this.state.userActive
      });

    } else {
      this.setState({
        dataMsg   : "Same data. No changes performed",
        flagMsg   : "NOK"
      })
      this.clearMessage();
      return;
    }
    const url = "http://localhost:3333/user";
    const flagResultPassword = (event.target.name === "changePassword") ? true : false;
    fetch( url, {  
      method  : "PUT",
      headers : { "Content-Type": "application/json" },
      body    : bodyData
    })
      .then(response => response.json())
      .then((resJSON) => {
        if ("name" in resJSON){
          const user = {
            id          : resJSON.id,
            name        : resJSON.name,
            email       : resJSON.email,
            userAdmin   : resJSON.user_admin,
            userActive  : resJSON.user_active
          };
          this.props.dispatchChangeAdminData({ user });
          if (!flagResultPassword)
            this.setState({
              dataMsg   : "Data updated successfully!",
              flagMsg   : "OK"});
          else
            this.setState({
              passwordMsg      : "Password has been changed successfuly!",
              flagMsg          : "OK"});
          this.clearMessage();
        } else if ("message" in resJSON){
          this.setState({
            dataMsg   : resJSON.message,
            flagMsg   : "NOK"});
          this.clearMessage();
        } else if ("messagePassword" in resJSON){
          this.setState({
            passwordMsg       : resJSON.messagePassword,
            flagMsg           : "NOK"});
          this.clearMessage();
        }          
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          dataMsg   : error.message,
          flagMsg   : "NOK"});
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

  handleUserProperty = event => {
    event.preventDefault();
    const tf = (event.target.value === "true") ? true : false;
    this.setState( { [event.target.name]: tf });
  }


  render() {
    return (
      <div className="moldura">
        <h1>Admin User's Page</h1>

        {/* user data Card */}
        <Card>
          <Form>
            <Form.Group as={Row} controlId="formName">
              <Form.Label column sm={2}>Name</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type        = "text"
                  placeholder = "User's name"
                  name        = "name"
                  disabled    = {this.state.disableEditData}
                  onChange    = {this.handleChange}
                  onKeyPress  = {this.handles}
                  value       = {this.state.name}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={2}>Email</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type        = "email"
                  disabled    = {this.state.disableEditData}
                  placeholder = "Users' email"
                  name        = "email"
                  onChange    = {this.handleChange}
                  onKeyPress  = {this.handles}
                  value       = {this.state.email}/>
              </Col>
            </Form.Group>

            <FormGroup as={Row}>
              <Form.Label column sm={2}> Admin </Form.Label>
              <Col sm={10}>
                <Button 
                  onClick   = { this.handleUserProperty } 
                  value     = "true"
                  name      = "userAdmin"
                  variant   = { !!(this.state.userAdmin) ? "success" : "outline-secondary" }
                  disabled  = { this.state.disableEditData } > Yes </Button>
                <Button
                  onClick   = { this.handleUserProperty } 
                  value     = "false"
                  name      = "userAdmin"
                  variant   = { !(this.state.userAdmin) ? "success" : "outline-secondary" }
                  disabled  = { this.state.disableEditData } > No  </Button>
              </Col>
            </FormGroup>

            <FormGroup as={Row}>
              <Form.Label column sm={2}> Active </Form.Label>
              <Col sm={10}>
                <Button 
                  onClick   = { this.handleUserProperty } 
                  value     = "true"
                  name      = "userActive"
                  variant   = { this.state.userActive ? "success" : "outline-secondary" }
                  disabled  = { this.state.disableEditData }                
                  > Yes </Button>
                <Button 
                  onClick   = { this.handleUserProperty } 
                  value     = "false"
                  name      = "userActive"
                  variant   = { !this.state.userActive ? "success" : "outline-secondary" }
                  disabled  = { this.state.disableEditData }
                > No  </Button>
              </Col>
            </FormGroup>

            <div>
              <Button variant="primary" type="submit" onClick={this.handleEdit} name="editData">
                {this.state.disableEditData ? "Edit Data" : "Cancel Edit"}
              </Button>
              <Button 
                variant = "success" 
                type    = "submit" 
                onClick = {this.handleSave}
                disabled= {this.state.disableEditData} >
                Save
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.dataMsg   }</span>
            </div>

          </Form>
        </Card>

        {/* password card */}
        <Card>
          <Form className="margins">
            <Form.Group as={Row} controlId="formCurrentPasswd">
            <Form.Label column sm={2}>Admin Password</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type        = "password"
                  placeholder = "Admininstrator password"
                  name        = "adminPassword"
                  disabled    = {this.state.disableEditPassword}
                  onChange    = {this.handleChange}
                  onKeyPress  = {this.handles}
                  value       = {this.state.adminPassword}
                />
              </Col>
            </Form.Group>

          <Form.Group as={Row} controlId="formNewPasswd">
            <Form.Label column sm={2}>New</Form.Label>
            <Col sm={10}>
              <Form.Control
                type        = "password"
                placeholder = "New password"
                name        = "newPassword"
                disabled    = {this.state.disableEditPassword}
                onChange    = {this.handleChange}
                onKeyPress  = {this.handles}
                value       = {this.state.newPassword}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formConfNewPasswd">
            <Form.Label column sm={2}>Confirm</Form.Label>
            <Col sm={10}>
              <Form.Control
                type        = "password"
                disabled    = {this.state.disableEditPassword}
                placeholder = "Confirm new password"
                name        = "confNewPassword"
                onChange    = {this.handleChange}
                onKeyPress  = {this.handles}
                value       = {this.state.confNewPassword}
              />
            </Col>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" onClick={this.handleEdit} name="changePassword">
              {this.state.disableEditPassword ? "Change Password" : "Cancel change password"}
            </Button>
            <Button variant="success" type="submit" 
                    onClick={this.handleSave} name ="changePassword" disabled={this.state.disableEditPassword}>
              Save
            </Button>
            <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.passwordMsg       }</span>
          </div>
          </Form>
        </Card>        
      </div>
    )}
}

const mapStateToProps = store => {
  return {
    storeId         : store.id,
    storeName       : store.name,
    storeEmail      : store.email,
    storeUserAdmin  : store.userAdmin,
    storeUserActive : store.userActive
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchChangeAdminData: user => dispatch({type:"LOGIN", data: user })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditUser);


