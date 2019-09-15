import React, { Component } from 'react';
import "./style.css";
import logo from "../Text-logo.png";
import Wrapper from "../layout/wrapper.js";
import {Link} from "react-router-dom"

export default class Results extends Component {
  render() {
  console.log(this.props)
    return (
      <Wrapper>
        <div className="main">
          <div style={{paddingTop: 80, paddingBottom: 20}}>
            <h1> Results </h1>
              <h2> Overall Sentiment Score </h2>
          </div>
          <div style={{padding: 10, right: 5, bottom: 5}}>
            <Link to="/record">
              <button className="button">
                <h2 style={{cursor: "pointer"}}> Continue Practicing </h2>
              </button>
            </Link>
          </div>
        </div>
      </Wrapper>
    );
  }
}
