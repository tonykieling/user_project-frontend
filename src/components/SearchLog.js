import React, { Component } from 'react';
import { connect } from 'react-redux'
import Home from './Home.js'
import {Button, Form, Card, Table, Accordion} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import { animateScroll as scroll } from "react-scroll";

// HEADER of the CSV file
// that downloads the LOG details
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
            eventypes: {},
            dateClear: false,
            eventLog: ""
    };
    
    // SMOOTH SCROLL
    // ========================================================
    // https://github.com/fisshy/react-scroll
    smoothScroll = () => {
      // scroll.scrollToBottom(); 
      scroll.scrollTo(800);
    };

    // HANDLE SUBMIT FUNCTIONS
    // ========================================================
    // 1) HANDLES CHANGES on Search per DATE INPUT fields
    //    a) handleStart (START DATE)
    //    b) handleEnd (END DATE)

    handleStart = (date) => {
          this.setState({ 
              startDate: date,
              eventLog: ''
          });
    }
    handleEnd = (date) => {
          this.setState({ 
              endDate: date,
              eventLog: ''
            });

    }
    // ========================================================
    // 2) HANDLES CHANGES on Search per EMAIL INPUT field
    // 3) HANDLES CHANGES on Search per EVENT TYPE INPUT field

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
          eventLog: '',
          dateClear: true
        });
    }
  
    // ========================================================
    // ALL IN ONE SEARCH
    searchAll = (event, stype) => {
          event.preventDefault();

          // THIS CLEARS THE FIELDS FILLED BY THE USER
          // - EMAIL FIELD
          // - ERROR MESSAGES
          this.setState({
                          errorMsg: '',
                          email: '',
                          dateClear: true
          });

          // DEFINES THE CONTENT THAT WILL BE SENT IN THE BODY OF THE POST 
          // TO THE SERVER ENDPOINTS EXECUTE THE SEARCH
          // =================================================================================
          let dynamicBody = '';
          switch (stype) {
            case 'searchdate':
                dynamicBody = {
                  start: this.state.startDate,
                  end: this.state.endDate
                }
                break;
            case 'searchevent':
                dynamicBody = {
                  etype: this.state.etype
                }  
                break;       
            case 'searchemail':
                dynamicBody = {
                  email: this.state.email
                }  
                break;  
            default:                                  
          }
          //console.log('dynamicBody > ',dynamicBody);

          // THE URL OF THE ENDPOINT IS FILLED WITH THE STYPE ( search type )
          // SEARCH TYPES:  DATE = searchdate / EVENT = searchevent / EMAIL = searchemail
          // =================================================================================
          const url = `http://localhost:3333/admin/${stype}`;
          fetch( url, {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( dynamicBody )
          })
          .then(response => response.json())
          .then((resJSON) => {
            // console.log(`${stype} > data coming from server >>>>> `, resJSON);  

            if ( 'message' in resJSON){
              this.setState({errorMsg: resJSON.message});  
            }
            else {
              this.setState({ 
                    eventLog: resJSON
                  });
              this.smoothScroll();    
              // console.log('DATE LOG >> ',this.state.dataTable);
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({errorDt: error.message});
          })
  }

  // ========================================================

  componentDidMount(){

    // This function will dynamically bring the EVENT TYPES 
    // to populate the dropdown list on the frontend FORM
    // =================================================================================

    const url = "http://localhost:3333/admin/eventypes";
    fetch(url)
      .then(response => response.json())
      .then((resJSON) => {
        // console.log('EVENT TYPES coming from server >>>>> ', resJSON);  
        if ( 'message' in resJSON){
          // if message means there is an ERROR
          this.setState({errorMsg: resJSON.message}); 
          // errorMsg will display a MESSAGE in the FRONTENT!!! 
        } else {
            // else ALL OK
            this.setState({eventypes: resJSON});
            
        }})
      .catch((error) => {
      console.error(error);
      this.setState({errorMsg: error.message});
      // errorMsg will display a MESSAGE in the FRONTENT!!!
      });

  }

  // ========================================================

  isAdmin = () => {
    return (
        <div className="moldura">
          <h1>Search User Log Registries</h1>

          <div className="searchOpt">
          <Accordion defaultActiveKey="0">
          <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Search by Email
                </Accordion.Toggle>
                </Card.Header>
                {/* <h3>Search by Email</h3> */}
                <Accordion.Collapse eventKey="0">
                <Form onSubmit={(event) => this.searchAll(event, 'searchemail')} id='searchemail'>
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
                </Accordion.Collapse>
          </Card>            

          <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Search by Date
                </Accordion.Toggle>
                </Card.Header>
                {/* <h3>Search by Date</h3> */}
                <Accordion.Collapse eventKey="1">
                <Form onSubmit={(event) => this.searchAll(event, 'searchdate')} id="searchDate">
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
                      isClearable={this.state.dateClear}
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
                      isClearable={this.state.dateClear}
                  />                  

                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                </Accordion.Collapse>
          </Card>           

          <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Search by Event Type
                </Accordion.Toggle>
                </Card.Header>
                {/* <h3>Search by Event Type</h3> */}
                <Accordion.Collapse eventKey="2">
                <Form onSubmit={(event) => this.searchAll(event, 'searchevent')} id='searchevent'>
                  <Form.Group controlId="selectType">
                    {/* <Form.Label>Select a User Event</Form.Label> */}
                    <Form.Control 
                        as="select" 
                        name="etype"
                        onChange={this.handleChange} 
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
                </Accordion.Collapse>
          </Card>
          </Accordion>
          </div>
          
          <div className="resultSearch" id="resTable">
          {/* THIS WILL DISPLAY ALL ERROR MESSAGES */}
          {/* ============================================================ */}
          { this.state.errorMsg ? <Card><h3>Warnings and Error Messages</h3><br/><p id="errorMsg">{ this.state.errorMsg }</p></Card> : '' }

          {/* CSV DOWNLOAD BUTTON and TABLE OF RESTULTS */}
          {/* ============================================================ */}
          <Card>
            <h3>Log Results</h3>
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
              <Table striped bordered hover size="sm" responsive>
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