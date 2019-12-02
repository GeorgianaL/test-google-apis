import React, {Component} from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import ApiCalendar from './GoogleCalendarApi/CalendarApi';

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
    this.addNewEvent = this.addNewEvent.bind(this);
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

  addNewEvent() {
    const eventDuration = 30;

    const newEvent = {
      summary: "Poc Dev From Now",
      start: {
        dateTime: (new Date(new Date().getTime() + 60000000)),
        timeZone: "Europe/Bucharest",
      },
      end: {
        dateTime: (new Date(new Date().getTime() + 60000000 + eventDuration * 60000)),
        timeZone: "Europe/Bucharest",
      },
  };
 
  ApiCalendar.createEvent(newEvent)
    .then(result => {
      console.log(result);
        })
     .catch(error => {
       console.log(error);
        });
  }

  addEventFromNow() {
    const eventFromNow = {
      summary: "Poc Dev From Now",
      time: 40,
  };
 
  ApiCalendar.createEventFromNow(eventFromNow)
    .then((result) => {
      console.log(result);
        })
     .catch((error) => {
       console.log(error);
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
      <button onClick={this.addNewEvent}>Add event</button>
      <button onClick={this.addEventFromNow}>Add event from now</button>
      </div>
    );
  }
}

export default App;
