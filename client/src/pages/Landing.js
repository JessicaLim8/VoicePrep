import React, { Component } from 'react';
import "../style.css";
import logo from "../images/logo.png";
import text from "../images/Text.png";
import {Link} from "react-router-dom"

const I = (s) => <span style={{fontStyle: 'italic'}}>{s.children}</span>;

export default class Landing extends Component {

  render() {
    return (
        <div className="main">
          <div style={{paddingTop: 80, paddingBottom: 20}}>
            <img src={text} width="25%" alt="logo"/>
            <p className="slogan">
              Interviews without <I>like</I>s, <I>literally</I>s, <I>but</I>s or other filler words
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
