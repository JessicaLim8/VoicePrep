import React, { Component } from 'react';
import "../style.css";
import logo from "../logo.png";
import {Link} from "react-router-dom"

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
            <Link to="/record">
              <button className="button">
                <h2 style={{cursor: "pointer"}}> Start Practicing! </h2>
              </button>
            </Link>
          </div>
      </div>
    );
  }
}
