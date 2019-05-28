import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    console.log("Login-: ", this.props);
    // const result = this.props.checkUser();
    if (!this.props.checkUser({email: this.state.email, password: this.state.password})) {
      alert("Email/Password is wrong!");
      this.setState({
        password: "",
        email: ""
      })
      return;
    }
    console.log(`User logged OK!!!!
                Should call dispatch`);

    this.props.login
    
  }

  isValid = () => {
    if (this.state.email === "" || this.state.password === "")
      return false;
    return true;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{marginLeft: 50, marginTop: 80}}>
          <label>User</label> <br />
          <input 
            type="text"
            name="email"
            onChange={this.handleChange} 
            value={this.state.email} 
            placeholder="Type the user's email">
          </input>
          <br /> <br />

          <label>Password</label> <br />
          <input 
            type="password"
            name="password"
            placeholder="type the user's password" 
            value={this.state.password} 
            onChange={this.handleChange}
            >
          </input>
          <br /> <br />

          <button disabled={!this.isValid()}>Submit</button>
        </form>

        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({type: "LOGIN", action: {email: "test", typeUser: "typeTest"}}),
    logout: () => dispatch({type: "LOGIN"})
  }
}

export default connect(null, mapDispatchToProps)(Home)