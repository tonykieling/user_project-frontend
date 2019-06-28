import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Card, Dropdown, DropdownButton, Table } from 'react-bootstrap';

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
      flagMsg: "",
      reportHidden: true,
      userTable: "",
      disableCleaListBtn: true
  }

  handleDropdownBtnName = e => {
    e.preventDefault();
    switch (e.target.name) {
      case "admin":
        this.setState({ 
          dropDownBtnName: "Admin",
          disableText: false,
          userType: "admin" });
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
          disableText: false,
          userType: "normal" });
        break;
      case "allNormal":
        this.setState({ 
          dropDownBtnName: "All normal users in the system",
          user: "",
          userAdmin: "normal",
          disableText: true,
          userType: "normal" });
        break;
      case "noUserType":
        this.setState({ 
          dropDownBtnName: "Wanna consider user's type?",
          disableText: false,
          userType: "" });
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
        flagMsg: ""
      })
    }, 5000);
  }


  handleSubmit = event => {
    event.preventDefault();
    console.log("name:", event.target)
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
      if ("message" in resJSON) {
        this.setState({
          errorMsg: resJSON.message,
          flagMsg: "NOK" });
        this.clearMessage();
      } else {
        //////// IT POPULATES THE TABLE
        this.setState({
          userTable: this.renderTableData(resJSON),
          disableCleaListBtn: false
        })
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        errorMsg: error.message,
        flagMsg: "NOK" });
      this.clearMessage();
    })
  }


  renderTableData(users) {
    return users.map((user, index) => {
      console.log("user", user);
       const { id, name, email, user_admin, user_active } = user;
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{email}</td>
             <td>{(user_admin) ? "Yes" : "No"}</td>
             <td>{(user_active) ? "Yes" : "No"}</td>
          </tr>
       )
    })
  }

  clearList = () => {
    this.setState({
      userTable: "",
      disableCleaListBtn: true
    });
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
                id="input-group-dropdown-1" >
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
                Get user's list
              </Button>
              <Button variant="primary" onClick={this.clearList}
                      disabled={this.state.disableCleaListBtn}>
                Clear list
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </Form>
          </Card>

          <Card>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Admin</th>
                <th>User Active</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userTable}
            </tbody>
          </Table>
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
