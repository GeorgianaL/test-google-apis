import React, {Component} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import ApiCalendar from 'react-google-calendar-api';

import credentials from './credentials.json';

const apiKey = 'AIzaSyAVF3dDnn30WtNV-rwgCxzthb1tqTfgKnA';
var SCOPES = ["https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

const calendarId = 'jtshko45fsrsgl5g7rsm1ppnkc@group.calendar.google.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      events: [],
    };

    this.getEvents = this.getEvents.bind(this);
  }

  successAuth = (response) => {
    this.setState({
      userEmail: response.profileObj.email
    });
  }

  failAuth = (response) => {
    console.log(response);
  }

  getEvents() {
    ApiCalendar.handleAuthClick();
    ApiCalendar.listUpcomingEvents(10)
      .then(({result}) => {
        console.log(result.items);
      });
  }

  render() {
    return (
      <div className="App">
      <GoogleLogin
        clientId={credentials.web.client_id}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={this.successAuth}
        onFailure={this.failAuth}
      />
      <br />
      <button onClick={this.getEvents}>Get events and see them in console</button>
      </div>
    );
  }
}

export default App;
