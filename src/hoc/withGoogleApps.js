import React from "react";

export default function withGoogleApps(WrappedComponent) {
  class ComponentWithGoogleAPI extends React.Component {
    state = { gapiReady: false };

    componentDidMount() {
      this.loadGoogleAPI();
    }

    loadGoogleAPI() {
      const { apiKey } = this.props;
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
    }

    render() {
      const { gapiReady } = this.state;
      if (gapiReady) return <WrappedComponent />;
      return <div>Loading...</div>;
    }
  }
  return ComponentWithGoogleAPI;
}
