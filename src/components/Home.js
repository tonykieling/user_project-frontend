import React, { Component } from 'react';
// import Landing from './Landing.js'
// import Lands from './Lands.js'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';

class Home extends Component {

  render() {
    return (
      <div className="moldura">
        <h1>Home Page</h1>
        <Card className="twothirds">
        <h2>Welcome {this.props.storeEmail} </h2> 
        <h3>This is your HOME.js</h3>
        </Card>
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
// export default Home;
