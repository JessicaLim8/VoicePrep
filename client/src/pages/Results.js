import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./style.css"
import Wrapper from "../layout/wrapper.js";
import { wordCounter } from "./wordcounter.js";
import { Link } from "react-router-dom";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { percentage: "--", text: this.props.location.state ? this.props.location.state.data : "hello hello hello like um like um like" }
  }

  async componentDidMount() {
    const documents = [{
      id: '1',
      text: this.state.text,
      language: "en",
    }]

    const response = await fetch('http://localhost:3001/analyze', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(documents), // body data type must match "Content-Type" header
    })

    const result = await response.json();
    console.log(result);
    this.setState({percentage: Math.round(result.sentiment.documents[0].score*100)});
  }

  render() {
    console.log(this.state);
    return (
      <Wrapper>
        <div className="main">
          <div style={{paddingTop: 0, paddingBottom: 15}}>
            <h1> Results </h1>
            <div className="vertGroup">
                <h2> Overall Positivity Score </h2>
                <h2> { this.state.percentage + "%" } </h2>
                <h2> Overused Filler Words </h2>
                {
                  Object.entries(wordCounter(this.state.text)).map(([key,value]) => {
                    if (value > 0) {
                      return (<div>{key} : {value.toString()}</div>);
                    };
                    return [];
                  })
                 }
            </div>
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
