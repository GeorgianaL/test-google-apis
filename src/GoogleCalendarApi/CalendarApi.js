import Config from "../apiGoogleconfig.json";
import { firstDayOfMonth, lastDayOfMonth } from "../utils/time";

class ApiCalendar {
  constructor() {
    this.sign = false;
    this.gapi = null;
    this.onLoadCallback = null;
    this.calendar = "primary";
    try {
      this.updateSigninStatus = this.updateSigninStatus.bind(this);
      this.initClient = this.initClient.bind(this);
      this.handleSignoutClick = this.handleSignoutClick.bind(this);
      this.handleAuthClick = this.handleAuthClick.bind(this);
      this.createEvent = this.createEvent.bind(this);
      this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
      this.listenSign = this.listenSign.bind(this);
      this.onLoad = this.onLoad.bind(this);
      this.setCalendar = this.setCalendar.bind(this);
      this.handleClientLoad();
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Update connection status.
   * @param {boolean} isSignedIn
   */
  updateSigninStatus(isSignedIn) {
    this.sign = isSignedIn;
  }
  /**
   * Auth to the google Api.
   */
  initClient() {
    this.gapi = window["gapi"];
    this.gapi.client
      .init(Config)
      .then(() => {
        // Listen for sign-in state changes.
        this.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.updateSigninStatus);
        // Handle the initial sign-in state.
        this.updateSigninStatus(
          this.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  /**
   * Init Google Api
   * And create gapi in global
   */
  handleClientLoad() {
    this.gapi = window["gapi"];
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    script.onload = () => {
      window["gapi"].load("client:auth2", this.initClient);
    };
  }
  /**
   * Sign in Google user account
   */
  handleAuthClick() {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().signIn();
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }
  /**
   * Set the default attribute calendar
   * @param {string} newCalendar
   */
  setCalendar(newCalendar) {
    this.calendar = newCalendar;
  }
  /**
   * Execute the callback function when a user is disconnected or connected with the sign status.
   * @param callback
   */
  listenSign(callback) {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }
  /**
   * Execute the callback function when gapi is loaded
   * @param callback
   */
  onLoad(callback) {
    if (this.gapi) {
      callback();
    } else {
      this.onLoadCallback = callback;
    }
  }
  /**
   * Sign out user google account
   */
  handleSignoutClick() {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().signOut();
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }
  /**
   * List all events in the calendar
   * @param {number} maxResults to see
   * @param {string} calendarId to see by default use the calendar attribute
   * @returns {any}
   */
  listUpcomingEvents(date, calendarId = this.calendar) {
    if (this.gapi) {
      return this.gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: firstDayOfMonth(date).toISOString(),
        timeMax: lastDayOfMonth(date).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime"
      });
    } else {
      console.log("Error: this.gapi not loaded");
      return false;
    }
  }
  /**
   * Create Calendar event
   * @param {string} calendarId for the event.
   * @param {object} event with start and end dateTime
   * @returns {any}
   */
  createEvent(event, calendarId = this.calendar) {
    return this.gapi.client.calendar.events.insert({
      calendarId: calendarId,
      resource: event
    });
  }

  updateEvent(event, calendarId = this.calendar) {
    return this.gapi.client.calendar.events.update({
      calendarId: calendarId,
      eventId: event.id,
      resource: event
    });
  }

  deleteEvent(eventId, calendarId = this.calendar) {
    return this.gapi.client.calendar.events.delete({
      calendarId: calendarId,
      eventId: eventId
    });
  }
}
let apiCalendar;
try {
  apiCalendar = new ApiCalendar();
} catch (e) {
  console.log(e);
}
export default apiCalendar;
