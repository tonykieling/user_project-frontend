import React, { Component } from 'react';
import Landing from './Landing.js'
import Lands from './Lands.js'
import { connect } from 'react-redux'

class Menu1 extends Component {

  noUserLogged = () => {
    return <Lands />
  }

  userLogged = () => {
    return <h2>Welcome { this.props.storeName } - This is Menu1</h2>
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
    storeName: store.name ,
    storeEmail: store.email
  }
}

export default connect(mapStateToProps, null)(Menu1)
