import React, { Component } from 'react';
import {Button, Card, Form, Col, Row, CardGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
// import picturePath from "../../../user_project-backend/IMG";


/*///////////////////////////////////////////////////////////////////////////
/////////////////////// handle enter key
*/

class UserPage extends Component {
  state = {
    id                : this.props.storeId,
    name              : this.props.storeName,
    email             : this.props.storeEmail,
    disable           : true,
    disablePassword   : true,
    confNewPassword   : "",
    newPassword       : "",
    currentPassword   : "",
    errorMsg          : "",
    errorMsgPassword  : "",
    flagMsg           : "",

    pictureName       : this.props.storePictureName,
    pictureNewFile    : ""
  }

  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        errorMsg          : "",
        flagMsg           : "",
        disable           : true,
        errorMsgPassword  : "",
        disablePassword   : true,
        newPassword       : "",
        currentPassword   : "",
        confNewPassword   : ""
      })
    }, 4000);
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
      if ((this.state.newPassword === this.state.confNewPassword) &&
       (this.state.currentPassword !== "") &&
       (this.state.newPassword !== "")) {
        bodyData = JSON.stringify({
          email       : this.props.storeEmail,
          password    : this.state.currentPassword,
          newPassword : this.state.newPassword
        });
      } else {
        if (this.state.currentPassword === "" || this.state.newPassword === "" || this.state.confNewPassword === "")
          this.setState({
            errorMsgPassword  : "Wrong: Password cannot be empty!",
            flagMsg           : "NOK"
          })
        else if (this.state.newPassword !== this.state.confNewPassword)
          this.setState({
            errorMsgPassword  : "Wrong: Diff new passwords!",
            flagMsg           : "NOK"
          })

        this.clearMessage();
        return;
      }
    } else if ((this.state.name !== this.props.storeName) || (this.state.email !== this.props.storeEmail)) {
      bodyData =  JSON.stringify({
        actualEmail : this.props.storeEmail,
        name        : this.state.name,
        email       : this.state.email
      })
    } else {
      this.setState({
        errorMsg  : "Same data. No changes performed",
        flagMsg   : "NOK"
      })
      this.clearMessage();
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
            if ('actualEmail' in JSON.parse(bodyData)) {
              const user = {
                id          : resJSON.id,
                name        : resJSON.name,
                email       : resJSON.email,
                userAdmin   : resJSON.user_admin,
                userActive  : resJSON.user_active
              }; 
              this.props.dispatchLogin({user});
              this.setState({
                errorMsg  : "Data updated successfully!",
                flagMsg   : "OK"});
            } else {
              this.setState({
                errorMsgPassword  : "Password has been changed successfuly!",
                flagMsg           : "OK"});
            }
            this.clearMessage();
          } else {
            if ('actualEmail' in JSON.parse(bodyData))
              this.setState({
                errorMsg  : resJSON.message,
                flagMsg   : "NOK"});
            else
              this.setState({
                errorMsgPassword  : resJSON.messagePassword,
                flagMsg           : "NOK"});

            this.clearMessage();       
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errorMsg  : error.message,
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

  // set button and button label regarding noPicture situation
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
              userAdmin   : this.state.user_admin,
              userActive  : this.state.user_active
            }; 
            this.props.dispatchLogin({user});
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
        <h1>User's Page</h1>

        {/* user data Card */}
        <CardGroup>
          <Card>
            <Card.Header className="cardTitle">User Picture</Card.Header>
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
              onChange={this.changePicture}
              ref={fileInput => this.fileInput = fileInput} />
          </Card>

          <Card>
            <Card.Header className="cardTitle">User Data</Card.Header>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                  <Form.Control
                    type        = "text"
                    placeholder = "User's name"
                    name        = "name"
                    disabled    = {this.state.disable}
                    onChange    = {this.handleChange}
                    onKeyPress  = {this.handles}
                    value       = {this.state.name}/>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    type        = "email"
                    disabled    = {this.state.disable}
                    placeholder = "Users' email"
                    name        = "email"
                    onChange    = {this.handleChange}
                    onKeyPress  = {this.handles}
                    value       = {this.state.email} />
              </Form.Group>
            <div>
              <Button variant="primary" type="submit" onClick={this.handleEdit}>
                Edit Data
              </Button>
              <Button 
                variant   = "success" 
                type      = "submit" 
                onClick   = {this.handleSave}
                disabled  = {this.state.disable}
                >
                Save
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </div>
          </Form>
          </Card>
        </CardGroup>

        {/* password card */}
        <Card>
          <Card.Header className="cardTitle">Password</Card.Header>
          <Form className="margins">
            <Form.Group as={Row} controlId="formCurrentPasswd">
            <Form.Label column sm={2}>Current</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type        = "password"
                  placeholder = "Current password"
                  name        = "currentPassword"
                  disabled    = {this.state.disablePassword}
                  onChange    = {this.handleChange}
                  onKeyPress  = {this.handles}
                  value       = {this.state.currentPassword}
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
                disabled    = {this.state.disablePassword}
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
                disabled    = {this.state.disablePassword}
                placeholder = "Confirm new password"
                name        = "confNewPassword"
                onChange    = {this.handleChange}
                onKeyPress  = {this.handles}
                value       = {this.state.confNewPassword}
              />
            </Col>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" onClick={this.handleEdit} name="btnPasswd">
              Change Password
            </Button>
            <Button variant="success" type="submit" 
                    onClick={this.handleSave} name ="btnPasswd" disabled={this.state.disablePassword}>
              Save
            </Button>
            <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsgPassword }</span>
          </div>
          </Form>
        </Card>        
      </div>
    )}
}

const mapStateToProps = store => {
  console.log("store", store);
  return {
    storeName         : store.name,
    storeEmail        : store.email,
    storeId           : store.id,
    storePictureName  : store.pictureName

  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: user => dispatch({type:"LOGIN", data: user })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


