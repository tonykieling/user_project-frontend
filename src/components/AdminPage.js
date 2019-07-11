import React, { Component } from 'react';
import {Button, Card, Form, Col, Row, FormGroup, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';


/*///////////////////////////////////////////////////////////////////////////
/////////////////////// handle enter in the fields
/////////////////////// type enters
//////////////////////  need check whether the persistence is working appropriatelly
//////////////////////    need to record in localStorage due to the admin refresh the page and lost user's data
//////////////////////
////////////////////// + fix route problem (it cannot be shown to the user, unless it's an Admin one)
*/

class AdminPage extends Component {
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
    flagMsg               : "",

    pictureName       : this.props.storePictureName,
    pictureNewFile    : ""
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
            pictureName : this.state.pictureName,
            userAdmin   : resJSON.user_admin,
            userActive  : resJSON.user_active
          };
          console.log("user before disptach", user);
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

  changePicture = event => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file.size > (1024 * 1024 * 1)) {
      alert("big file!");
      event.target.value = null;
    } else {
      this.setState({ 
        pictureNewFile: file });
    }
  }

  // set button and button label regarding noPicture situation or save new picture
  handlePictureBtn = event => {
    if (event.target.value === "no")
      this.setState({ pictureNewFile: null });
    else {
      const data = new FormData();
      data.append("name", this.state.name.split(" ")[0].toLowerCase());
      data.append("id", this.state.id);
      data.append("file", this.state.pictureNewFile);
      const url = "http://localhost:3333/user/picture";
      fetch( url, {  
        method: "PUT",
        body: data
      })
        .then(response => response.json())
        .then((resJSON) => {
          if ('pictureName' in resJSON){
            const user = {
              id          : this.state.id,
              pictureName : resJSON.pictureName,
              name        : this.state.name,
              email       : this.state.email,
              userAdmin   : this.state.userAdmin,
              userActive  : this.state.userActive
            };
            this.props.dispatchChangeAdminData({user});
            this.setState({
              errorMsg  : "Picture updated successfully!",
              flagMsg   : "OK",
              pictureNewFile: null});
          } else 
            console.log("message: ", resJSON.message);
        });
    }
  }  

  render() {
    return (
      <div className="moldura">
        <h1>Admin User's Page</h1>

        {/* user data Card */}
        <CardGroup>
          {/* picture Card */}
          <Card className="card-picture">
            <Card.Header className="cardTitle">Admin Picture</Card.Header>
            <Card.Img src={
              this.state.pictureNewFile ?
                URL.createObjectURL(this.state.pictureNewFile) :
                // `${process.env.PUBLIC_URL}/IMG/${this.state.pictureName}`} rounded />
                require("../img/" + this.state.pictureName)} />
                {/* import("../img/" + this.state.pictureName)} rounded/> */}
                {/* ???????????????????????????????????
                difference btw these three ways???????????????????????
                ?????????????????????????????????????? */}
            <div>
              <Button variant="primary" type="submit"
                      onClick={() => this.fileInput.click()} 
                      className={this.state.pictureNewFile ? "hiddenClass" : "showClass"} >
                {this.state.pictureName === "userPhoto.png" ? "Set Picture?" : "Change Picture?"}
              </Button>
              <div className={this.state.pictureNewFile ? "showClass" : "hiddenClass"}>
                <Form.Text>Save new Picture?</Form.Text>
                <Button variant="success" type="submit" onClick={this.handlePictureBtn} value="yes">
                  Yes
                </Button>
                <Button variant="danger" type="submit" onClick={this.handlePictureBtn} value="no">
                  No
                </Button>
              </div>
            </div>
            <input 
              type="file"
              style={{display: "none"}}
              accept="image/png, image/jpeg"
              onChange={this.changePicture}
              ref={fileInput => this.fileInput = fileInput} />
          </Card>

          {/* Admin data card */}
          <Card className="card-data">
          <Card.Header className="cardTitle">Admin Data</Card.Header>
            <Form>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm={2} className="card-label">Name</Form.Label>
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
                <Form.Label column sm={2} className="card-label">Email</Form.Label>
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

              <FormGroup>
                <Form.Label className="card-label yn">Admin </Form.Label>
                  <Button 
                    className = "btnYesNo"
                    onClick   = { this.handleUserProperty } 
                    value     = "true"
                    name      = "userAdmin"
                    variant   = { !!(this.state.userAdmin) ? "success" : "outline-secondary" }
                    disabled  = { this.state.disableEditData } > Yes </Button>
                  <Button
                    className = "btnYesNo"
                    onClick   = { this.handleUserProperty } 
                    value     = "false"
                    name      = "userAdmin"
                    variant   = { !(this.state.userAdmin) ? "success" : "outline-secondary" }
                    disabled  = { this.state.disableEditData } > No  </Button>
              </FormGroup>

              <FormGroup>
                <Form.Label className="card-label yn"> Active </Form.Label>
                  <Button 
                    className = "btnYesNo"
                    onClick   = { this.handleUserProperty } 
                    value     = "true"
                    name      = "userActive"
                    variant   = { this.state.userActive ? "success" : "outline-secondary" }
                    disabled  = { this.state.disableEditData }                
                    > Yes </Button>
                  <Button 
                    className = "btnYesNo"
                    onClick   = { this.handleUserProperty } 
                    value     = "false"
                    name      = "userActive"
                    variant   = { !this.state.userActive ? "success" : "outline-secondary" }
                    disabled  = { this.state.disableEditData }
                  > No  </Button>
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
        <Card className="card-data">
        <Card.Header className="cardTitle">Password</Card.Header>
          <Form className="margins">
            <Form.Group controlId="formCurrentPasswd">
            <Form.Label>Actual Admin's Password</Form.Label>
              <Col sm={10} className="card-text-margin">
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

          <Form.Group controlId="formNewPasswd">
            <Form.Label>New Password</Form.Label>
            <Col sm={10} className="card-text-margin">
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

          <Form.Group controlId="formConfNewPasswd">
            <Form.Label>Confirm New Password</Form.Label>
            <Col sm={10} className="card-text-margin">
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
        </CardGroup>
      </div>
    )}
}

const mapStateToProps = store => {
  return {
    storeId           : store.id,
    storeName         : store.name,
    storeEmail        : store.email,
    storePictureName  : store.pictureName,
    storeUserAdmin    : store.userAdmin,
    storeUserActive   : store.userActive
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchChangeAdminData: user => dispatch({type:"LOGIN", data: user })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
