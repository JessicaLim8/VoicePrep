import React, {Component} from 'react';
import "../style.css";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
import text from "../images/Text.png";

export default class Landing extends Component {
  render() {
    return (
      <div className="main">
        <div style={{paddingTop: 80, paddingBottom: 20}}>
          <img src={text} width="25%" alt="logo" />
          <p className="slogan">
            Interviews without <em>like</em>s, <em>literally</em>s, <em>but</em>s or other filler words
          </p>
          <img src={logo} width="25%" alt="logo" />
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
