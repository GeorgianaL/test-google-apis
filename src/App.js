import React, { Component } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import ApiCalendar from "./GoogleCalendarApi/CalendarApi";

const parseEvent = event => ({
  id: event.id,
  title: event.summary,
  description: event.description,
  start: new Date(event.start.dateTime),
  end: new Date(event.end.dateTime),
  creator: event.creator,
  organizer: event.organizer,
  attendees: event.attendees || []
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: new Date(),
      events: []
    };

    this.getEvents = this.getEvents.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
  }

  // successAuth = response => {
  //   this.setState({
  //     userEmail: response.profileObj.email
  //   });
  // };

  // failAuth = response => {
  //   console.log(response);
  // };

  changeFocusedDate = date => {
    this.setState({
      defaultDate: date
    });
    this.getEvents();
  };

  getEvents() {
    const { defaultDate } = this.state;

    ApiCalendar.handleAuthClick();
    ApiCalendar.listUpcomingEvents(defaultDate).then(({ result }) => {
      const events = result.items.map(item => parseEvent(item));
      this.setState({
        events
      });
    });
  }

  addNewEvent() {
    const eventDuration = 30;

    const newEvent = {
      summary: "Poc Dev From Now",
      start: {
        dateTime: new Date(new Date().getTime() + 60000000),
        timeZone: "Europe/Bucharest"
      },
      end: {
        dateTime: new Date(
          new Date().getTime() + 60000000 + eventDuration * 60000
        ),
        timeZone: "Europe/Bucharest"
      },
      attendees: [{ email: "ionela@mailinator.com" }]
    };

    ApiCalendar.createEvent(newEvent)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { defaultDate } = this.state;
    const { events } = this.state;
    const localizer = momentLocalizer(moment);
    const allViews = Object.keys(Views).map(k => Views[k]);
    console.log(events);
    return (
      <div className="App">
        <Calendar
          defaultView={Views.WORK_WEEK}
          step={15}
          timeslots={8}
          localizer={localizer}
          events={events}
          views={allViews}
          defaultDate={defaultDate}
          date={defaultDate}
          onNavigate={this.changeFocusedDate}
        />
        <button onClick={this.getEvents}>Get events</button>
        <button onClick={this.addNewEvent}>Add event</button>
      </div>
    );
  }
}

export default App;
