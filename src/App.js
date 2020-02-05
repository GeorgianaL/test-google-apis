import React, { Component } from "react";
import AppCalendar from "./Calendar/Calendar";
import "./App.css";

class App extends Component {
  render() {
    const apiKey = "AIzaSyAVF3dDnn30WtNV-rwgCxzthb1tqTfgKnA";
    return <AppCalendar apiKey={apiKey} />;
  }
}

export default App;
