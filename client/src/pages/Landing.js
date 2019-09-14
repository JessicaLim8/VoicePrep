import React, { Component } from 'react';
import "../style.css";
import logo from "../logo.png";

export default class Landing extends Component {
  render() {
    return (
        <div className="main">
          <div style={{paddingTop: 80, paddingBottom: 20}}>
            <img src={logo} width="15%" alt="logo"/>
          </div>
          <div>
            <h1>
              Voice Prep
            </h1>
            <p>
              No more Uhms and Likes
            </p>
          </div>
          <div style={{padding: 10}}>
            <button className="button">
              <h2 style={{cursor: "pointer"}}> Start Practicing! </h2>
            </button>
          </div>
      </div>
    );
  }
}
