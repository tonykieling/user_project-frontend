import React, { Component } from 'react';
import { connect } from 'react-redux'
import Home from './Home.js'
import {Button, Form, Card, Table} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";


const fileHeaders = [
  { label: "#", key: "id" },
  { label: "User", key: "userid" },
  { label: "Event", key: "event" },
  { label: "Date", key: "created_at" }
];

class SearchLog extends Component {

    state = {
            email: "",
            etype: "",
            startDate: new Date(),
            endDate: new Date(),
            errorMsg: "",
            errorEvt: "",
            errorDt: "",
            eventypes: {},
            emailLog: {},
            eventLog: ""
    };
    
    handleStart = (date) => {
          console.log('SELECTED START >>> ', date);
          this.setState({ startDate: date });
          this.setState({eventLog: ''});
    }

    handleEnd = (date) => {
      console.log('SELECTED END >>> ', date);
      this.setState({ endDate: date });
      this.setState({eventLog: ''});
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
        this.setState({eventLog: ''});
        this.setState({errorMsg: ''});
    }
    
    handleSelect = e => {
      this.setState({ etype : e.target.value });
      // console.log('SELECTED >>> ', this.state.etype);
      this.setState({errorEvt: ''});
      this.setState({errorMsg: ''});
      this.setState({eventLog: ''});
    }
  
    searchDate = event => {
      event.preventDefault();
      this.setState({errorDt: ''});

      const url = "http://localhost:3333/admin/searchdate";
      fetch( url, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
              start: this.state.startDate,
              end: this.state.endDate
            })
      })
      .then(response => response.json())
      .then((resJSON) => {
        console.log(' DATE SEARCH data coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          this.setState({errorDt: resJSON.message});  
        }
        else {
          // const emailLog = resJSON;
          // let csvString = resJSON.join(";");
          // let csvString = JSON.stringify(resJSON);
          this.setState({ 
                eventLog: resJSON
                // dataTable: resJSON
               });
          // console.log('DATE LOG >> ',this.state.dataTable);
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({errorDt: error.message});
      })
  }

    searchEmail = event => {
        event.preventDefault();
        this.setState({errorMsg: ''});
        this.setState({email: ''});
  
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
            this.setState({eventLog: resJSON});
            console.log('EMAIL LOG >> ',this.state.eventLog);
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({errorMsg: error.message});
        })
    }

    searchEvent = event => {
      event.preventDefault();
      this.setState({errorEvt: ''});
      
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
        // console.log(' EVENT SEARCH data coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          this.setState({errorEvt: resJSON.message});  
          console.log("error 1");
        }
        else {
          // const eventLog = resJSON;
          this.setState({eventLog: resJSON});
          console.log('EVENT LOG >> ',this.state.eventLog);
        }
      })
      .catch((error) => {
        console.log("error 2");
        console.error(error);
        this.setState({errorEvt: error.message});
      })
  }

  componentDidMount(){

    // This function will dynamically bring the EVENT TYPES 
    // to populate the dropdown list on the frontend FORM
    // ============================================================

    const url = "http://localhost:3333/admin/eventypes";
    fetch(url)
      .then(response => response.json())
      .then((resJSON) => {
        // console.log('EVENT TYPES coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          // if message means there is an ERROR
          this.setState({errorEvt: resJSON.message}); 
          // errorMsg will display a MESSAGE in the FRONTENT!!! 
        } else {
            // else ALL OK
            this.setState({eventypes: resJSON});
            
        }})
      .catch((error) => {
      console.error(error);
      this.setState({errorEvt: error.message});
      // errorMsg will display a MESSAGE in the FRONTENT!!!
      });

  }

  isAdmin = () => {
    return (
        <div className="moldura">
          <h1>Search User Log Registries</h1>

          <div className="searchOpt">
          <Card>
                <h3>Search by Date</h3>

                <Form onSubmit={this.searchDate} id="searchDate">
                  <Form.Group>
                  <Form.Label>Start Date </Form.Label>

                  <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      onChange={this.handleStart}
                      dateFormat="yyyy-MM-dd"
                      todayButton={"today"}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                  />
                  <br />
                  <Form.Label>End Date </Form.Label>
                  <DatePicker
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleEnd}
                      minDate={this.state.startDate}
                      dateFormat="yyyy-MM-dd"
                      todayButton={"today"}                      
                  />                  

                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <p id="errorEvt">{ this.state.errorDt }</p>
          </Card>           

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
                    {/* <Form.Label>Select a User Event</Form.Label> */}
                    <Form.Control 
                        as="select" 
                        onChange={this.handleSelect} 
                        value={this.state.etype || -1 }
                      >
                        <option  key={-1} >Select a User Event</option>
                      {Object.entries(this.state.eventypes).map(([key, value]) => (
                           <option key={key} >{value}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <p id="errorEvt">{ this.state.errorEvt }</p>
          </Card>

        </div>

          <Card>
            <CSVLink
                data      = {this.state.eventLog}
                headers   = {fileHeaders}
                separator = {";"}
                filename  = "downloadedLog.csv"
                className = "btn btn-primary"
                target    = "blank" >
                Download me
              </CSVLink>
              <br/>
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
                {Object.entries(this.state.eventLog).map(([key, value]) => (
                        <tr key={key}>
                           <td>{value.id}</td>
                           <td>{value.userid}</td>
                           <td>{value.event}</td>
                           <td>{value.created_at}</td>
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
    storeAdmin: store.userAdmin
  }
}
  

export default connect(mapStateToProps, null)(SearchLog)

