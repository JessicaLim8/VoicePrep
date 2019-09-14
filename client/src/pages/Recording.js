import React, { Component } from 'react';
import "../style.css";
import play from "./play.png";
import pause from "./pause.png";
export default class Recording extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: false, question: questions[Math.floor(Math.random() * 10)]}
  }

  changeQ = () => {
    this.setState({question: questions[Math.floor(Math.random() * 10)] })
  }

  recording = () => {
    const isPlaying = this.state.playing;
    this.setState({playing: !isPlaying});
  }

  render() {
    return (
        <div className="main" style={{paddingTop: 50}}>
          <div>
            <h2>
              " {this.state.question} "
            </h2>
          </div>
          <div style={{padding: 20}}>
            <img src={this.state.playing === true ? play : pause} alt={this.state.playing ? "RECORDING" : "PAUSED"} onClick={this.recording} style={{cursor: "pointer"}}/>
          </div>
          <div style={{padding: 20}}>
            <button className="button" onClick={this.recording}>
              <h2 style={{cursor: "pointer"}}> {this.state.playing === true ? "Analyze Recording" : "Start Recording"} </h2>
            </button>
          </div>
          <div>
            <p > Don't like the question? Click <span onClick={this.changeQ} style={{textDecoration: "underline", cursor: "pointer"}}>here</span> for a new one </p>
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
