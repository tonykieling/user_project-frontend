import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Card, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { Redirect } from 'react-router-dom';


///////////////////////////////////////////////////////////////////////////////////////
// ToDo:
//  form style
//
///////////////////////////////////////////////////////////////////////////////////////
const fileHeaders = [
  { label: "#", key: "num" },
  { label: "id", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "User Admin", key: "userAdmin" },
  { label: "User Active", key: "userActive" }
];

class ListUsers extends Component {
  state = {
      user                    : "",
      userType                : "",
      dropDownBtnName         : "Wanna consider user's type?",
      disableText             : false,
      errorMsg                : "",
      flagMsg                 : "",
      // userListTable           : "twothirds",
      userListTable           : "",
      userTableHideClassName  : "hiddeUserTable",
      disableClearListBtn     : true,
      dataTableCSVFile               : "",
      flagToRedirect          : false
  }


  handleDropdownBtnName = e => {
    e.preventDefault();
    switch (e.target.name) {
      case "admin":
        this.setState({ 
          dropDownBtnName : "Admin",
          disableText     : false,
          userType        : "admin" });
        break;
      case "allAdmin":
        this.setState({ 
          dropDownBtnName : "All Admin users in the system",
          user            : "",
          userType        : "admin",
          disableText     : true });
        break;
      case "normal":
        this.setState({ 
          dropDownBtnName : "Normal user",
          disableText     : false,
          userType        : "normal" });
        break;
      case "allNormal":
        this.setState({ 
          dropDownBtnName : "All normal users in the system",
          user            : "",
          userAdmin       : "normal",
          disableText     : true,
          userType        : "normal" });
        break;
      case "noUserType":
        this.setState({ 
          dropDownBtnName : "Wanna consider user's type?",
          disableText     : false,
          userType        : "" });
        break;
      default:
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
        errorMsg  : "",
        flagMsg   : ""
      })
    }, 5000);
  }


  handleSubmit = event => {
    event.preventDefault();
    const url = "http://localhost:3333/admin/listUsers";
    fetch( url, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
            userAdmin : this.props.storeEmail,
            user      : this.state.user,
            userType  : this.state.userType
          })
    })
    .then(response => response.json())
    .then((resJSON) => {
      if ("message" in resJSON) {
        this.setState({
          errorMsg                : resJSON.message,
          flagMsg                 : "NOK",
          userTableHideClassName  : "hiddeUserTable" });
        this.clearMessage();
      } else {
        //////// IT POPULATES THE TABLE
        this.setState({
          userListTable           : this.renderDataTable(resJSON),
          dataTableCSVFile        : this.renderDataToCSV(resJSON),
          disableClearListBtn     : false,
          userTableHideClassName  : "" 
        });
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        errorMsg  : error.message,
        flagMsg   : "NOK" });
      this.clearMessage();
    })
  }

  // handleCallEdit = event => {
  handleCallEdit = user => {
    // const user = JSON.parse(event.currentTarget.dataset.user);
    console.log("user===", user);
    this.props.dispatchAdminChangeUser(user);
    this.setState({ flagToRedirect: true });
  }


  renderDataToCSV = users => {
    return users.map((user, index) => {
      const userToCSV = {
        num         : index + 1,
        id          : user.id,
        name        : user.name,
        email       : user.email,
        userAdmin   : (user.user_admin === true) ? "YES" : "NO",
        userActive  : (user.user_active === true) ? "YES" : "NO"
      };
      return userToCSV;
    });
  }


  renderDataTable = users => {
    return users.map((user, index) => {
      const userToSend = {
        num         : index + 1,
        id          : user.id,
        name        : user.name,
        email       : user.email,
        userAdmin   : user.user_admin,
        userActive  : user.user_active,
        pictureName : user.picture_name
      }

      return (
        <tr key={user.id}>
          <td>{userToSend.num}</td>
          <td>{userToSend.id}</td>
          <td>{userToSend.name}</td>
          <td>{userToSend.email}</td>
          <td>{userToSend.userAdmin  ? "Yes" : "No"}</td>
          <td>{userToSend.userActive ? "Yes" : "No"}</td>
          <td>
            <Button
              variant   = "info"
              onClick   = {() => this.handleCallEdit(userToSend)}
              // data-user = {JSON.stringify(userToSend)}
            > Edit</Button>
          </td>
        </tr>
      )
    })
  }

  clearList = () => {
    this.setState({
      userListTable           : "",
      disableClearListBtn     : true,
      userTableHideClassName  : "hiddeUserTable"
    });
  }


  render() {

    if (this.state.flagToRedirect)
      return <Redirect to = "/adminEditUser" />;

    return (
      <div className="moldura">
        <h1>Admin - List Users</h1>
          <Card className="twothirds">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search for (name or email)</Form.Label>
                <Form.Control
                  autoFocus   = {true}
                  type        = "text"
                  placeholder = "Type Email OR Name"
                  name        = "user"
                  onChange    = {this.handleChange}
                  value       = {this.state.user}
                  disabled    = {this.state.disableText}
                />
              <Form.Label>AND / OR</Form.Label>

              <DropdownButton
                variant = "outline-secondary"
                title   = {this.state.dropDownBtnName}
                id      = "input-group-dropdown-1" >
                <Dropdown.Item 
                  onClick = {this.handleDropdownBtnName}
                  name    = "admin">Admin</Dropdown.Item>
                <Dropdown.Item 
                  onClick = {this.handleDropdownBtnName}
                  name    = "allAdmin">All Admin Users in the system</Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item 
                  onClick = {this.handleDropdownBtnName}
                  name    = "normal">Normal User</Dropdown.Item>
                <Dropdown.Item 
                  onClick = {this.handleDropdownBtnName}
                  name    = "allNormal">All Normal Users in the system</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick = {this.handleDropdownBtnName}
                  name    = "noUserType">Never mind</Dropdown.Item>
              </DropdownButton>
            </Form.Group>

              
              <Button variant="primary" type="submit">
                Get user's list
              </Button>
              <Button variant="primary" onClick={this.clearList}
                      disabled={this.state.disableClearListBtn}>
                Clear list
              </Button>
              <span id={(this.state.flagMsg === "OK") ? "errorMsgBlue" : "errorMsgRed"}>{ this.state.errorMsg }</span>
            </Form>
          </Card>

          <Card id="listuserResult" className={this.state.userTableHideClassName}>
          {this.state.userListTable ? 
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Admin</th>
                  <th>User Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userListTable}
              </tbody>
            </Table> :
            null }
          <CSVLink
              data      = {this.state.dataTableCSVFile}
              headers   = {fileHeaders}
              separator = {";"}
              filename  = {(this.state.dropDownBtnName === "Wanna consider user's type?") ?
                                        "userList.csv" :
                                        `${this.state.dropDownBtnName}.csv`}
              className = "btn btn-primary"
              target    = "blank" >
              Download me
            </CSVLink>            
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchAdminChangeUser: userToBeChanged => dispatch({type:"ADMINCHANGEUSER", data: userToBeChanged })
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)
