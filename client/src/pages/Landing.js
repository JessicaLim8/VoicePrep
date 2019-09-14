import React, { Component } from 'react';
import "../style.css";
import logo from "../logo.png";

export default class Landing extends Component {
  render() {
    return (
        <div className="main">
          <div style={{paddingTop: 80, paddingBottom: 20}}>
            <h1>
              Voice Prep
            </h1>
            <p>
              Interview with no more Uhms and Likes
            </p>
            <img src={logo} width="25%" alt="logo"/>
          </div>
          <div style={{padding: 10}}>
          </div>
      </div>
    );
  }
}
