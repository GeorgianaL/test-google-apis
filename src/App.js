import React, {Component} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import credentials from './credentials.json';

const apiKey = 'AIzaSyB1PRwRANbJvLkAiRJKk4WTNAUjklz2krQ';
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
    const { userEmail } = this.state;
    console.log('the events are:');
    function start() {
      window.gapi.client.init({
        'apiKey': apiKey,
        'clientId': credentials.web.client_id,
        'scope': SCOPES,
        'discoveryDocs': DISCOVERY_DOCS,
        'calendarId': calendarId
      }).then(function() {
        return window.gapi.client.request({
          'path': `https://www.googleapis.com/calendar/v3/calendars/${userEmail}/events`
          // 'path': 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
        })
      }).then((response) => {
        console.log(response);
      });
    }
    window.gapi.load('client', start)
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>
      <GoogleLogin
        clientId={credentials.web.client_id}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={this.successAuth}
        onFailure={this.failAuth}
      />
      <br />
      <button onClick={this.getEvents}>Get events</button>
      </div>
    );
  }
}

export default App;
