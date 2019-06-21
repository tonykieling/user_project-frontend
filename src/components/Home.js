import React, { Component } from 'react';
// import Landing from './Landing.js'
// import Lands from './Lands.js'
// import { connect } from 'react-redux'

class Home extends Component {

  render() {
    return (
      <h2>Welcome {this.props.storeEmail} - This is HOME.js</h2>
    )
  }
}

// const mapStateToProps = store => {
//   return {
//     storeEmail: store.email
//   }
// }

// export default connect(mapStateToProps, null)(Home)
export default Home;
