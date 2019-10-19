import React, { Component } from 'react';
import "../style.css";
import logo from "../logo.png";
import text from "../Text.png";
import {Link} from "react-router-dom"

export default class Landing extends Component {
  render() {
    return (
        <div className="main">
          <div style={{paddingTop: 80, paddingBottom: 20}}>
            <img src={text} width="25%" alt="logo"/>
            <p>
              Prep for interviews with literally no more okays, likes, and other fillers
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
