import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Home from './Home.js';
import { Button, Form, Card, Dropdown, DropdownButton } from 'react-bootstrap';

///////////////////////////////////////////////////////////////////////////////////////
// ToDo:
//  form style
//  set focus on admin emails
///////////////////////////////////////////////////////////////////////////////////////
class ListUsers extends Component {
    state = {
        user: "",
        userType: "",
        dropDownBtnName: "Wanna consider user's type?",
        disableText: false,

        errorMsg: "",
        flagMsg: ""
    }

    handleDropdownBtnName = e => {
      e.preventDefault();
      console.log("e", e.target);
      switch (e.target.name) {
        case "admin":
          this.setState({ 
            dropDownBtnName: "Admin",
            disableText: false });
          break;
        case "allAdmin":
          this.setState({ 
            dropDownBtnName: "All Admin users in the system",
            user: "",
            userType: "admin",
            disableText: true });
          break;
        case "normal":
          this.setState({ 
            dropDownBtnName: "Normal user",
            disableText: false });
          break;
        case "allNormal":
          this.setState({ 
            dropDownBtnName: "All normal users in the system",
            user: "",
            userAdmin: "normal",
            disableText: true });
          break;
        case "allNormal":
          this.setState({ 
            dropDownBtnName: "Wanna consider user's type?",
            disableText: false });
          break;
      }
    }


    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }    
  
    clearMessage = () => {
      setTimeout(() => {
        this.setState({
          errorMsg: "",
          user: "",
          flagMsg: ""
        })
      }, 5000);
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("this.state", this.state)
        const url = "http://localhost:3333/admin/listUsers";
        fetch( url, {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
                userAdmin: this.props.storeEmail,
                user: this.state.user,
                userType: this.state.userType
              })
        })
        .then(response => response.json())
        .then((resJSON) => {
          console.log("resJSON", resJSON);
            this.setState({
              errorMsg: "resJSON.message",
              flagMsg: "NOK" });
            this.clearMessage();
          
            // // ToDo: set focus on email field
            // this.setState({
            //     errorMsg: resJSON.email,
            //     flagMsg: "OK" });
            // this.clearMessage();
          
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errorMsg: error.message,
            flagMsg: "NOK" });
          this.clearMessage();
        })
    }


  render() {

    return (
      <div className="moldura">
        <h1>Admin - List Users</h1>
          <Card>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search for (name or email)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Email OR Name"
                  name="user"
                  onChange={this.handleChange}
                  value={this.state.user}
                  disabled={this.state.disableText}
                />
              <Form.Label>AND / OR</Form.Label>

              <DropdownButton
                variant="outline-secondary"
                title={this.state.dropDownBtnName}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item 
                  onClick={this.handleDropdownBtnName}
                  name="admin">Admin</Dropdown.Item>
                <Dropdown.Item 
                  onClick={this.handleDropdownBtnName}
                  name="allAdmin">All Admin Users in the system</Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item 
                  onClick={this.handleDropdownBtnName}
                  name="normal">Normal User</Dropdown.Item>
                <Dropdown.Item 
                  onClick={this.handleDropdownBtnName}
                  name="allNormal">All Normal Users in the system</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={this.handleDropdownBtnName}
                  name="noUserType">Never mind</Dropdown.Item>

            </DropdownButton>
          </Form.Group>

              
              <Button variant="primary" type="submit">
                Get list
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </Form>
          </Card>
        </div>
      )
    

  }
}

const mapStateToProps = store => {
  return {
    storeAdmin: store.userAdmin,
    storeEmail: store.email,
  }
}
  

export default connect(mapStateToProps, null)(ListUsers)
