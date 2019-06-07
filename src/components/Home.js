import React, { Component } from 'react';
import Landing from './Landing.js'
import { connect } from 'react-redux'

class Home extends Component {

  noUserLogged = () => {
    return <Landing />
  }

  userLogged = () => {
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
  return {
    storeEmail: store.email
  }
}

export default connect(mapStateToProps, null)(Home)
