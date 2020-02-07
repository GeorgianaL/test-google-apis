import React, { Component } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withGoogleApps from "../hoc/withGoogleApps";
// import Config from "../apiGoogleconfig";
// import ApiCalendar from "../GoogleCalendarApi/CalendarApi";
import ToggleSwitch from "../components/ToggleSwitch";

// const parseEvent = event => ({
//   id: event.id,
//   title: event.summary,
//   description: event.description,
//   start: new Date(event.start.dateTime),
//   end: new Date(event.end.dateTime),
//   creator: event.creator,
//   organizer: event.organizer,
//   attendees: event.attendees || []
// });

class AppCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: new Date(),
      events: [],
      isSignedIn: props.isSignedIn
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isSignedIn !== state.isSignedIn) {
      return {
        ...state,
        isSignedIn: props.isSignedIn
      };
    }
    return null;
  }

  changeSyncToggle = () => {
    const { isSignedIn } = this.state;
    this.setState(
      {
        isSignedIn: !isSignedIn
      },
      () => {
        if (isSignedIn) {
          this.props.googleSignOut();
        } else {
          this.props.googleSignIn();
        }
      }
    );
  };

  changeFocusedDate = date => {
    this.setState({
      defaultDate: date
    });
    this.getEvents();
  };

  getEvents = () => {
    // const { defaultDate } = this.state;
    // ApiCalendar.handleAuthClick();
    // ApiCalendar.listUpcomingEvents(defaultDate).then(({ result }) => {
    //   const events = result.items.map(item => parseEvent(item));
    //   this.setState({
    //     events
    //   });
    // });
  };

  addNewEvent = () => {
    // const eventDuration = 30;

    // const newEvent = {
    //   summary: "Poc Dev From Now",
    //   start: {
    //     dateTime: new Date(new Date().getTime() + 60000000),
    //     timeZone: "Europe/Bucharest"
    //   },
    //   end: {
    //     dateTime: new Date(
    //       new Date().getTime() + 60000000 + eventDuration * 60000
    //     ),
    //     timeZone: "Europe/Bucharest"
    //   },
    //   attendees: [{ email: "ionela@mailinator.com" }]
    // };

    // ApiCalendar.createEvent(newEvent)
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    this.getEvents();
  };

  render() {
    const { defaultDate } = this.state;
    const { isSignedIn } = this.props;
    const { events } = this.state;
    const localizer = momentLocalizer(moment);
    const allViews = Object.keys(Views).map(k => Views[k]);

    console.log(isSignedIn);
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
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <ToggleSwitch
                id="googleSync"
                name="googleSync"
                onChange={this.changeSyncToggle}
                defaultChecked={isSignedIn}
              />
            </div>
            <span style={{ padding: "0px 10px" }}>
              Sync with your google account
            </span>
          </div>
          <button onClick={this.getEvents}>Get events</button>
          <button onClick={this.addNewEvent}>Add event</button>
        </div>
      </div>
    );
  }
}

export default withGoogleApps(AppCalendar);
