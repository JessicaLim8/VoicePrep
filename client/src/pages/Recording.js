import React, { Component } from 'react';
import "./style.css";
import play from "./play.png";
import pause from "./pause.png";
import logo from "../logo.png";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.autoStart = false
recognition.interimResults = true
recognition.lang = 'en-US'

export default class recordAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
      playing: false,
      question: questions[Math.floor(Math.random() * 10)],
      recognition: recognition,
      first: true
    }

    this.state.recognition.onresult = this.handleListen.bind(this)
  }

  handleListen = (event) => {
    if (event.results[0][0].confidence >= 0.85) {
      this.setState({transcript: event.results[0][0]})
    }
  }

  changeQ = () => {
    this.setState({first: true, question: questions[Math.floor(Math.random() * 10)] })
  }

  restart = () => {
    this.setState({transcript: "", first: true});
    this.recordAction();
  }

  recordAction = () => {
    const isPlaying = this.state.playing;
    if (!isPlaying) {
      recognition.start();
      console.log("starting to record")
    } else if (isPlaying) {
      recognition.stop();
      console.log("recordAction has stopped");
    }
    this.setState({playing: !isPlaying});
  }

  render() {
    return (
        <div className="main" style={{paddingTop: 50}}>
          <div>
            <img src={logo} width="15%" alt="logo"/>
            <h2>
              " {this.state.question} "
            </h2>
          </div>
          <div style={{padding: 20}}>
            <img src={this.state.playing === true ? play : pause} alt={this.state.playing ? "recordAction" : "PAUSED"} onClick={this.recording} style={{cursor: "pointer"}}/>
          </div>
          <div style={{padding: 20}}>
            { this.state.transcript.length === 0 || this.state.playing === true ?
              <button className="button" onClick={this.recordAction}>
                <h2 style={{cursor: "pointer"}}> {this.state.playing === true ? "Stop Recording" : "Start Recording"} </h2>
              </button> :
              <div className="group">
                <div className="groupbutton">
                  <button className="button" onClick={this.recordAction}>
                    <h2 style={{cursor: "pointer"}}> Continue </h2>
                  </button>
                </div>
                <div className="groupbutton">
                  <button className="button" onClick={this.recordAction}>
                    <h2 style={{cursor: "pointer"}}> Restart </h2>
                  </button>
                </div>
                <div className="groupbutton">
                  <button className="accentButton" onClick={() => console.log(this.state.transcript)} >
                    <h2 style={{cursor: "pointer"}}> Analyze </h2>
                  </button>
                </div>
              </div>
            }
          </div>
          <div>
            <p> Don't like the question? Click <span onClick={this.changeQ} style={{textDecoration: "underline", cursor: "pointer"}}>here</span> for a new one </p>
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
