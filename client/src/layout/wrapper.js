import React, { Component } from 'react';
import { Link } from "react-router-dom";
import home from "./home.png";
import logo from "../Text-logo.png";
import "./style.css"

export default class Landing extends Component {
  render() {
    return(
      <div>
        <div className="Header">
          <Link to={"/"}>
            <img src={logo} width="45%" alt="logo"/>
          </Link>
        </div>
        <div className="bodypart">
          {this.props.children}
        </div>
      </div>
    )
  }
}
