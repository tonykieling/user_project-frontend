import React, { Component } from 'react';
import { Button, Card, Form, Col, Row, CardGroup, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

const DEFAULTTIMETOEDITDATA     = 20000;  // default time to the user edit data in ms
const DEFAULTTIMETOEDITPASSWORD = 10000;  // default time to the user edit password in ms
const DEFAULTTIMETOCLEARMSG     = 4000;   // default time to message for both data and password action be cleaned


class UserPage extends Component {
  state = {
    id                : this.props.storeId,
    name              : this.props.storeName,
    email             : this.props.storeEmail,
    disableEditData           : true,
    disableEditPassword   : true,
    confNewPassword   : "",
    newPassword       : "",
    currentPassword   : "",
    errorMsg          : "",
    errorMsgPassword  : "",
    flagMsg           : "",
    pictureName       : this.props.storePictureName,
    pictureNewFile    : "",
    remainingTime1    : 0,
    remainingTime2    : 0,
    enableSubmit      : undefined
  }


  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        errorMsg          : "",
        errorMsgPassword  : "",
        flagMsg           : ""
      });
    }, DEFAULTTIMETOCLEARMSG);
  }


  handleEdit = event => {
    event.preventDefault();
    if (event.target.name === "btnPasswd") {
      this.setState({
        disableEditData     : true,
        disableEditPassword : !this.state.disableEditPassword,
        remainingTime2      : (this.state.disableEditPassword ? DEFAULTTIMETOEDITPASSWORD : 0),
        remainingTime1      : 0,
        currentPassword     : "",
        newPassword         : "",
        confNewPassword     : "",
        });

      setTimeout(() => {
        this.textInput1.focus();
      }, 0);

    } else if (event.target.name === "editData") {
      this.setState({ 
        disableEditPassword : true,
        disableEditData     : !this.state.disableEditData,
        remainingTime1      : ((this.state.disableEditData) ? DEFAULTTIMETOEDITDATA : 0),
        remainingTime2      : 0
      });

      if (!this.state.disableEditData)
        this.timeoutOrCancel();
    }
  }


  timeoutOrCancel = () => {
    this.setState({
      disableEditData     : true,
      disableEditPassword : true,
      currentPassword     : "",
      newPassword         : "",
      confNewPassword     : "",
      id                  : this.props.storeId,
      name                : this.props.storeName,
      email               : this.props.storeEmail,
      remainingTime1      : 0,
      remainingTime2      : 0
    })
  }


  handleSave = event => {
    console.log("inside handleSave");
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
            errorMsgPassword  : "Password cannot be empty!",
            flagMsg           : "NOK"
          })
        else if (this.state.newPassword !== this.state.confNewPassword)
          this.setState({
            errorMsgPassword  : "Diff new passwords!",
            flagMsg           : "NOK"
          })

        this.setState({
          enableSubmit        : undefined,
          currentPassword     : "",
          newPassword         : "",
          confNewPassword     : "",
          remainingTime2      : 0,
          disableEditPassword : true
        });

        this.clearMessage();
        return;
      }
    } else {
      if ((this.state.name !== this.props.storeName) || (this.state.email !== this.props.storeEmail))
        bodyData =  JSON.stringify({
          actualEmail : this.props.storeEmail,
          name        : this.state.name,
          email       : this.state.email });
      else {
        this.setState({
          errorMsg        : "Same data. No changes performed",
          flagMsg         : "NOK",
          disableEditData : true,
          remainingTime1  : 0,
          enableSubmit    : undefined
        })
        this.clearMessage();
        return;
      }
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
                pictureName : this.state.pictureName,
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
            // this.clearMessage();
          } else {
            if ('actualEmail' in JSON.parse(bodyData))
              this.setState({
                errorMsg  : resJSON.message,
                flagMsg   : "NOK"});
            else
              this.setState({
                errorMsgPassword  : resJSON.messagePassword,
                flagMsg           : "NOK"});

            // this.clearMessage();       
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errorMsg  : error.message,
            flagMsg   : "NOK" });
        })
    this.clearMessage();
    this.setState({
      enableSubmit        : undefined,
      disableEditData     : true,
      disableEditPassword : true,
      remainingTime1      : 0,
      remainingTime2      : 0
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
    if (e.key === "Enter"){
      if ((e.target.name === "currentPassword") && (this.state.currentPassword !== ""))
        this.textInput2.focus();
      if ((e.target.name === "newPassword") && (this.state.newPassword !== ""))
        this.textInput3.focus();
      if ((e.target.name === "confNewPassword") && (this.state.confNewPassword !== ""))
        this.setState({ enableSubmit: "submit"});

      if ((e.target.name === "name") && (this.state.name !== ""))
        this.textInput4.focus();
      else if ((e.target.name === "email") && (this.state.email !== ""))
        this.setState({ enableSubmit: "submit"})
    }
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
          <Card className="card-picture">
            <Card.Header className="cardTitle">User Picture</Card.Header>
            <Card.Img 
              onClick = {() => this.fileInput.click()}
              src     = { this.state.pictureNewFile ?
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
              type="file"
              style={{display: "none"}}
              accept="image/png, image/jpeg"
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
                    disabled    = {this.state.disableEditData}
                    onChange    = {this.handleChange}
                    onKeyPress  = {this.handles}
                    value       = {this.state.name}/>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    type        = "email"
                    disabled    = {this.state.disableEditData}
                    placeholder = "Users' email"
                    name        = "email"
                    onChange    = {this.handleChange}
                    onKeyPress  = {this.handles}
                    value       = {this.state.email}
                    ref         = {input => this.textInput4 = input} />
              </Form.Group>
            <div className="userPageBtns">
            <div>
              <Button variant="primary" onClick={this.handleEdit} name="editData">
                {this.state.disableEditData ? "Edit Data" : "Cancel Edit"}
              </Button>
              <Button 
                variant   = "success"
                name      = "data"
                type      = {this.state.enableSubmit} 
                onClick   = {this.handleSave}
                disabled  = {this.state.disableEditData}
                >
                Save
              </Button>
              </div>
              <Container>
              {this.state.remainingTime1 ?
                <span>Remaining time:&nbsp;&nbsp;&nbsp;
                  <Countdown
                    date        = {Date.now() + this.state.remainingTime1}
                    renderer    = {({ hours, minutes, seconds, completed }) => seconds}
                    onComplete  = {this.timeoutOrCancel}
                  />s
                </span> :
                <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
              }
            </Container>
              {/* <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span> */}
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
                  disabled    = {this.state.disableEditPassword}
                  onChange    = {this.handleChange}
                  onKeyPress  = {this.handles}
                  value       = {this.state.currentPassword}
                  ref         = {input => this.textInput1 = input}
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
                ref         = {input => this.textInput2 = input}
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
                ref         = {input => this.textInput3 = input}
              />
            </Col>
          </Form.Group>

          <div className="userPageBtns">
            <div>
            <Button variant="primary" onClick={this.handleEdit} name="btnPasswd">
              {this.state.disableEditPassword ? "Change Password" : "Cancel Change"}
            </Button>
            <Button 
              variant   ="success" 
              type      ={this.state.enableSubmit}
              onClick   ={this.handleSave} 
              name      ="btnPasswd" 
              disabled  ={this.state.disableEditPassword} >
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
                <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsgPassword }</span>
              }
            </Container>
            {/* <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsgPassword }</span> */}
            
          </div>
          </Form>
        </Card>        
      </div>
    )}
}

const mapStateToProps = store => {
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


