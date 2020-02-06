import React from "react";
import { Spinner } from "react-bootstrap";
import ApiCalendar from "../GoogleCalendarApi/CalendarApi";
import credentials from "../apiGoogleconfig.json";

const withGoogleCredentials = WrappedComponent => {
  class ComponentWithGoogleAPI extends React.Component {
    constructor(props) {
      super(props);
      this.gapi = null;
      this.ApiCalendar = null;
      this.state = {
        gapiReady: false
      };
    }

    componentDidMount() {
      const apiKey = credentials.apiKey;
      this.loadGoogleAPI(apiKey);
    }

    loadGoogleAPI(apiKey) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";

      script.onload = () => {
        window.gapi.load("client", () => {
          window.gapi.client.setApiKey(apiKey);
          window.gapi.client.load("calendar", "v3", () => {
            this.setState({ gapiReady: true });
          });
        });
      };

      document.body.appendChild(script);
      this.gapi = window["gapi"];
    }

    render() {
      const { gapiReady } = this.state;
      console.log(this.ApiCalendar);
      if (gapiReady)
        return (
          <WrappedComponent
            isSignedIn={gapiReady}
            googleSignOut={this.signOut}
            googleSignIn={this.signIn}
          />
        );
      return (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Spinner
            animation="border"
            variant="primary"
            role="loading"
            aria-hidden="true"
          />
        </div>
      );
    }
  }

  return ComponentWithGoogleAPI;
};

export default withGoogleCredentials;
