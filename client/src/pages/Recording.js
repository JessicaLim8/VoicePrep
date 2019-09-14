import React, { Component } from 'react';
import "../style.css";

export default class Recording extends Component {
  render() {
    return (
        <div className="main">
          <div>
            <h2>
              " {questions[Math.floor(Math.random() * 10)]} "
            </h2>
          </div>
          <div style={{padding: 10}}>
            <button className="button">
              <h2 style={{cursor: "pointer"}}> Start Recording </h2>
            </button>
          </div>
      </div>
    );
  }
}

const questions = [
  "Tell me about yourself",
  "What is your best quality",
  "What is your greatest weakness",
  "Explain a time you overcame a challenge",
  "Provide an example of a time you worked in a team environment",
  "What is your proudest accomplishment",
  "What is a passion of yours",
  "Describe yourself in 3 words",
  "Who is your role model, and why",
  "What qualities do you look for in a company culture?"
]
