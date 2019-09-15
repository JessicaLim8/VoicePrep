import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "../Text-logo.png";

export default class Landing extends Component {
  render() {
    return(
      <div>
        <div className="Header">
          <Link to={"/"}>
            <img src={logo} width="15%" alt="logo"/>
          </Link>
          <Link to={"/"}>
            <img style={{cursor: "pointer"}} src={logo} width="5%" alt="logo"/>
          </Link>
        </div>
        <div className="bodypart">
          {this.props.children}
        </div>
      </div>
    )
  }
}
