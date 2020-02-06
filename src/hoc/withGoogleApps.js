import React from "react";
import { Spinner } from "react-bootstrap";
import ApiCalendar from "../GoogleCalendarApi/CalendarApi";
import credentials from "../apiGoogleconfig.json";

const withGoogleCredentials = WrappedComponent => {
  class ComponentWithGoogleAPI extends React.Component {
    constructor(props) {
      super(props);
      this.sign = false;
      this.gapi = null;

      this.ApiCalendar = null;
      this.state = {
        gapiReady: false,
        isSignedIn: false
      };
      this.updateSigninStatus = this.updateSigninStatus.bind(this);
      this.handleClientLoad = this.handleClientLoad.bind(this);
    }

    componentDidMount() {
      // const apiKey = credentials.apiKey;
      // this.loadGoogleAPI(apiKey);
      this.handleClientLoad();
    }

    // loadGoogleAPI(apiKey) {
    //   const script = document.createElement("script");
    //   script.src = "https://apis.google.com/js/client.js";

    //   script.onload = () => {
    //     window.gapi.load("client", () => {
    //       window.gapi.client.setApiKey(apiKey);
    //       window.gapi.client.load("calendar", "v3", () => {
    //         this.setState({ gapiReady: true });
    //       });
    //     });
    //   };

    //   document.body.appendChild(script);
    //   this.gapi = window["gapi"];
    // }

    /**
     * Update connection status.
     * @param {boolean} isSignedIn
     */
    updateSigninStatus(isSignedIn) {
      this.sign = isSignedIn;
      this.setState({
        isSignedIn
      });
    }

    /**
     * Auth to the google Api.
     */
    initClient() {
      this.gapi = window["gapi"];
      this.gapi.client
        .init({
          clientId:
            "310763681489-pf0bkcs4qfacukhvl8pq839jbrblurqn.apps.googleusercontent.com",
          apiKey: "AIzaSyAVF3dDnn30WtNV-rwgCxzthb1tqTfgKnA",
          scope: "https://www.googleapis.com/auth/calendar",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
          ]
        })
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
        this.setState({ gapiReady: true });
      };
    }

    signIn = () => {
      window["gapi"].auth2.getAuthInstance().signIn();
    };

    signOut = () => {
      window["gapi"].auth2.getAuthInstance().signOut();
    };

    render() {
      const { gapiReady } = this.state;
      console.log(this.state);
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
