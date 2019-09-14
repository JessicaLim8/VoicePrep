import React, { Component } from 'react';
import "./style.css";
import Landing from "./pages/Landing.js";
import Recording from "./pages/Recording.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "Landing" };
  }

  onClick = () => {
    this.setState({current: "Recording"})
  }

  render() {
    return (
      <div className="App">
        { this.state.current === "Landing" ?
          (<div>
              <Landing/>
              <button className="button" onClick={this.onClick}>
                <h2 style={{cursor: "pointer"}}> Start Practicing! </h2>
              </button>
          </div>) :
          <Recording/> }
      </div>
    );
  }
}
