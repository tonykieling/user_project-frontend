import React, { Component } from 'react';
import Landing from './Landing.js'
import { connect } from 'react-redux'

class Home extends Component {
  // constructor(props) {
  //   super(props)
  // }
  noUserLogged = () => {
    // return <h2 style={{ display: "flex", justifyContent: "center", color: "red"}}>No user</h2>
    return <Landing />
  }

  userLogged = () => {
    // return <h2 style={{ display: "flex", justifyContent: "center", color:"blue"}}>Welcome {this.props.email}</h2>
    return <h2>Welcome user - This is HOME.js</h2>
  }

  render() {
    return (
      <div>
        {this.props.storeEmail ?
          (this.userLogged()) :
          (this.noUserLogged())
        }
      </div>
    )
  }
}

const mapStateToProps = store => {
  // console.log("store:: ", store)
  return {
    storeEmail: store.email
  }
}

export default connect(mapStateToProps, null)(Home)
