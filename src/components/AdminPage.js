import React, { Component } from 'react';
import { Button, Card, Form, Col, Row, FormGroup, CardGroup, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

const DEFAULTTIMETOEDITDATA     = 20000;  // default time to the user edit data in ms
const DEFAULTTIMETOEDITPASSWORD = 10000;  // default time to the user edit password in ms
const DEFAULTTIMETOCLEARMSG     = 4000;   // default time to message for both data and password action be cleaned

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
    pictureName           : this.props.storePictureName,
    pictureNewFile        : undefined,
    enableSubmit          : undefined,
    editTimeout           : 0,
    remainingTime1        : 0,
    remainingTime2        : 0
  }


  //this method clear some fields and disable the edition both data and password
  //if no time passed to, there is a defaulttime of 3,5s
  //when applicable for edit timeout, the time passed as argument will be 20s and 
  // it is renewed each time the user makes changes (typing new caracteres)
  // it means if the user doesnt type for 20s, the new data will be lost and preserved the old one
  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        dataMsg     : "",
        flagMsg     : "",
        passwordMsg : ""
      });
    }, DEFAULTTIMETOCLEARMSG);
  }


  timeoutOrCancel = () => {
    this.setState({
      disableEditData     : true,
      disableEditPassword : true,
      newPassword         : "",
      adminPassword       : "",
      confNewPassword     : "",
      id                  : this.props.storeId,
      name                : this.props.storeName,
      email               : this.props.storeEmail,
      userAdmin           : this.props.storeUserAdmin,
      userActive          : this.props.storeUserActive,
      remainingTime1      : 0,
      remainingTime2      : 0
    })
  }


  handleEdit = event => {
    event.preventDefault();
    if (event.target.name === "changePassword") {
      this.setState({ 
        remainingTime2      : (this.state.disableEditPassword ? DEFAULTTIMETOEDITPASSWORD : 0),
        remainingTime1      : 0,
        disableEditPassword : !this.state.disableEditPassword,
        disableEditData     : true,
        adminPassword       : "",
        newPassword         : "",
        confNewPassword     : "" });
      
      setTimeout(() => {
        this.textInput1.focus();
      }, 0);
  
    } else if (event.target.name === "editData") {
      this.setState({ 
        disableEditData     : !this.state.disableEditData,
        disableEditPassword : true,
        remainingTime1      : (this.state.disableEditData ? DEFAULTTIMETOEDITDATA : 0),
        remainingTime2      : 0 });

      if (!this.state.disableEditData)
        this.timeoutOrCancel();
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

        this.setState({ 
          enableSubmit        : undefined,
          adminPassword       : "",
          newPassword         : "",
          confNewPassword     : "",
          remainingTime2      : 0,
          disableEditPassword : true });
          
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
        dataMsg         : "Same data. No changes performed",
        flagMsg         : "NOK",
        disableEditData : true,
        remainingTime1  : 0,
        enableSubmit    : undefined
      });

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
          this.props.dispatchChangeAdminData({ user });
          if (!flagResultPassword)
            this.setState({
              dataMsg   : "Data updated successfully!",
              flagMsg   : "OK"});
          else
            this.setState({
              passwordMsg      : "Password has been changed successfuly!",
              flagMsg          : "OK"});
          // this.clearMessage();
        } else if ("message" in resJSON){
          this.setState({
            dataMsg   : resJSON.message,
            flagMsg   : "NOK"});
          // this.clearMessage();
        } else if ("messagePassword" in resJSON){
          this.setState({
            passwordMsg       : resJSON.messagePassword,
            flagMsg           : "NOK"});
          // this.clearMessage();
        }          
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          dataMsg   : error.message,
          flagMsg   : "NOK"});
      })

  this.clearMessage();
  this.setState({ 
    enableSubmit        : undefined,
    disableEditData     : true,
    disableEditPassword : true,
    remainingTime1      : 0,
    remainingTime2      : 0,
    adminPassword       : "",
    newPassword         : "",
    confNewPassword     : "" });
  }


  // it handles when the user types
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value,
      remainingTime1      : (this.state.remainingTime1 ? DEFAULTTIMETOEDITDATA : 0),
      remainingTime2      : (this.state.remainingTime2 ? DEFAULTTIMETOEDITPASSWORD : 0)
    });
  }


  // it handles enter key on the form
  handles = e => {
    if (e.key === "Enter"){
      if ((e.target.name === "adminPassword") && (this.state.adminPassword !== ""))
        this.textInput2.focus();
      if ((e.target.name === "newPassword") && (this.state.newPassword !== ""))
        this.textInput3.focus();
      if ((e.target.name === "confNewPassword")  && (this.state.confNewPassword !== ""))
        this.setState({ enableSubmit: "submit"});

      if ((e.target.name === "name") && (this.state.name !== ""))
        this.textInput4.focus();
      else if ((e.target.name === "email") && (this.state.email !== ""))
        this.setState({ enableSubmit: "submit"})
    }
  }


  handleUserProperty = event => {
    event.preventDefault();
    const tf = (event.target.value === "true") ? true : false;
    this.setState( { 
      [event.target.name] : tf,
      remainingTime1      : DEFAULTTIMETOEDITDATA });
  }


  changePicture = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const maxSizeFile = 1; // in MB

    if (file.size > (1024 * 1024 * maxSizeFile))
      alert(`\nbig file!\n\n
            Maximum file size is ${maxSizeFile}MB.\n`);
    else
      this.setState({ 
        pictureNewFile: file });

    //it clears the element, allowing it to be shown in the next selection
    event.target.value = null;

    this.timeoutOrCancel();
  }


  // set button and button label regarding noPicture situation or save new picture
  handlePictureBtn = event => {
    if (event.target.value === "no")
      this.setState({ pictureNewFile: undefined });
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
        <CardGroup className="group1">
          {/* picture Card */}
          <Card className="card-picture">
            <Card.Header className="cardTitle">Admin Picture</Card.Header>
              <Card.Img
                onClick   = {() => this.fileInput.click()}
                src       = { this.state.pictureNewFile ?
                  URL.createObjectURL(this.state.pictureNewFile) :
                  // `${process.env.PUBLIC_URL}/IMG/${this.state.pictureName}`} rounded />
                  require("../img/" + this.state.pictureName)} />
                  {/* import("../img/" + this.state.pictureName)} rounded/> */}
                  {/* ???????????????????????????????????
                  difference btw these three ways???????????????????????
                  ?????????????????????????????????????? */}
            <div>
              <Button variant   = "primary" type="submit"
                      onClick   = {() => this.fileInput.click()} 
                      className = {this.state.pictureNewFile ? "hiddenClass" : "showClass"} >
                {this.state.pictureName === "defaultPicture.jpg" ? "Set Picture?" : "Change Picture?"}
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
              type      = "file"
              style     = {{display: "none"}}
              accept    = "image/png, image/jpeg"
              onChange  = {this.changePicture}
              ref       = {fileInput => this.fileInput = fileInput} />
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
                    value       = {this.state.email}
                    onKeyPress  = {this.handles}
                    ref         = {input => this.textInput4 = input} />
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

              <div className="userPageBtns">
                <div>
                  <Button 
                    variant = "primary" 
                    onClick = {this.handleEdit} 
                    name    = "editData">
                    {this.state.disableEditData ? "Edit Data" : "Cancel Edit"}
                  </Button>
                  <Button 
                    variant   = "success" 
                    type      = {this.state.enableSubmit}
                    onClick   = {this.handleSave}
                    disabled  = {this.state.disableEditData} >
                    Save
                  </Button>

                  <Container>
                    {this.state.remainingTime1 ?
                      <span>Remaining time:&nbsp;&nbsp;&nbsp;
                        <Countdown
                          date        = {Date.now() + this.state.remainingTime1}
                          renderer    = {({ hours, minutes, seconds, completed }) => seconds}
                          onComplete  = {this.timeoutOrCancel}
                        />s
                      </span> :
                      <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.dataMsg   }</span>
                    }
                  </Container>
                </div>
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
                  ref         = {input => this.textInput1 = input }
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
                ref         = {input => this.textInput2 = input }
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
                ref         = {input => this.textInput3 = input }
              />
            </Col>
          </Form.Group>

          <div className="userPageBtns">      
          <div>
            <Button 
              variant = "primary" 
              onClick = {this.handleEdit} 
              name    = "changePassword" >
              {this.state.disableEditPassword ? "Change Password" : "Cancel change"}
            </Button>
            <Button 
              variant   = "success" 
              type      = {this.state.enableSubmit}
              onClick   = {this.handleSave} 
              name      = "changePassword" 
              disabled  = {this.state.disableEditPassword}>
              Save
            </Button>
            </div>
            <Container>
              {this.state.remainingTime2 ?
                <span>Remaining time:&nbsp;&nbsp;&nbsp;
                  <Countdown
                    date        = {Date.now() + this.state.remainingTime2}
                    renderer    = {({ hours, minutes, seconds, completed }) => seconds}
                    onComplete  = {this.timeoutOrCancel}
                  />s
                </span> :
                <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.passwordMsg }</span>
              }
            </Container>
                {/* <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.passwordMsg }</span> */}
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
