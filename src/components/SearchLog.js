import React, { Component } from 'react';
import { connect } from 'react-redux'
import Home from './Home.js'
import {Button, Form, Card, Table} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

class Grant extends Component {
  // constructor(props) {
  //   super(props);
    state = {
      email: "",
      etype: "",
      errorMsg: "",
      eventypes: {},
      emailLog: {},
      eventLog: {}
        };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
  // }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    handleSelect = e => {
      this.setState({ 'etype' : e.target.value });
      console.log('SELECTED >>> ', this.state.etype);
    }
  

    searchEmail = event => {
        event.preventDefault();
  
        const url = "http://localhost:3333/admin/searchemail";
        fetch( url, {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
                email: this.state.email
              })
        })
        .then(response => response.json())
        .then((resJSON) => {
          console.log(' EMAIL SEARCH data coming from server >>>>> ', resJSON);  
          if ( 'message' in resJSON){
            this.setState({errorMsg: resJSON.message});  
          }
          else {
            // const emailLog = resJSON;
            this.setState({emailLog: resJSON});
            console.log('EMAIL LOG >> ',this.state.emailLog);
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({errorMsg: error.message});
        })
    }

    searchEvent = event => {
      event.preventDefault();

      const url = "http://localhost:3333/admin/searchevent";
      fetch( url, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
              etype: this.state.etype
            })
      })
      .then(response => response.json())
      .then((resJSON) => {
        console.log(' EVENT SEARCH data coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          this.setState({errorMsg: resJSON.message});  
        }
        else {
          // const eventLog = resJSON;
          this.setState({eventLog: resJSON});
          console.log('EVENT LOG >> ',this.state.eventLog);
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({errorMsg: error.message});
      })
  }

  componentDidMount(){

    const url = "http://localhost:3333/admin/eventypes";
    fetch(url)
      .then(response => response.json())
      .then((resJSON) => {
        // console.log('EVENT TYPES coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          this.setState({errorMsg: resJSON.message});  
        } else {
            // const eventypes = resJSON;
            this.setState({eventypes: resJSON});
            // console.log('STATE EVENTYPES >>',this.state.eventypes);
        }})
      .catch((error) => {
      console.error(error);
      this.setState({errorMsg: error.message});
      });

  }

  isAdmin = () => {
    return (
        <div className="moldura">
          <h1>Search User Log Registries</h1>

          <Card>
                <h3>Search by User Email</h3>
                <Form onSubmit={this.searchEmail}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Type the user's email"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <p id="errorMsg">{ this.state.errorMsg }</p>
          </Card>

          <Card>
                <h3>Search by Event Type</h3>
                <Form onSubmit={this.searchEvent}>
                  <Form.Group controlId="selectType">
                    <Form.Label>Select User Event</Form.Label>
                    <Form.Control 
                        as="select" 
                        onChange={this.handleSelect} 
                        value={this.state.etype}  
                      >
                      {Object.entries(this.state.eventypes).map(([key, value]) => (
                           <option key={key} >{value}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <p id="errorMsg">{ this.state.errorMsg }</p>
          </Card>

          <Card>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Event</th>
                    <th>Logged Date</th>
                  </tr>
                </thead>
                <tbody id="resultable">
                {Object.entries(this.state.eventLog).map(([key, value]) => ( console.log('>>>>>>>> ',value),
                        <tr key={key}>
                           <td>{value[0]}</td>
                           <td>{value[1]}</td>
                           <td>{value[2]}</td>
                           <td>{value[3]}</td>
                           {/* <td>{value[id]}</td>
                           <td>{value[userid]}</td>
                           <td>{value[event]}</td>
                           <td>{value[date_time]}</td>                            */}
                        </tr>
                      ))}
                      
                </tbody>
              </Table>
          </Card>   

        </div>
      )
  }

  isNotAdmin = () => {
    return <Home />
  }

  render() {
    // if (this.state.redirectFlag)
    //   return(<Redirect to="/menu1" />);

    return (
      <div>
        {this.props.storeAdmin ?
          (this.isAdmin()) :
          (this.isNotAdmin())
        }
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
  

export default connect(mapStateToProps, null)(Grant)
