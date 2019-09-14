import React, { Component } from 'react';
import "./style.css";
import Landing from "./pages/Landing.js";
import Recording from "./pages/Recording.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "Landing" };
  }

  render() {
    return (
      <div className="App">
        { this.state.current === "Landing" ? <Landing/> : <Recording/>  }
      </div>
    );
  }
}
