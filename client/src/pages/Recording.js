import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import play from "./images/play.png";
import pause from "./images/pause.png";
import logo from "../images/Text-logo.png";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.autoStart = false
recognition.interimResults = true
recognition.lang = 'en-US'

export default class Recording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
      playing: false,
      question: questions[Math.floor(Math.random() * questions.length)],
      recognition: recognition,
      first: true
    }

    this.state.recognition.onresult = this.handleListen.bind(this)
  }

  handleListen = (event) => {
    if (event.results[0][0].confidence >= 0.85) {
      this.setState({transcript: event.results[0][0].transcript});
    }
  }

  changeQ = () => {
    this.setState({ first: true, question: questions[Math.floor(Math.random() * 10)] })
  }

  restart = () => {
    this.setState({ transcript: "", first: true, playing: false });
    recognition.stop();
    this.recordAction();
  }

  recordAction = () => {
    const isPlaying = this.state.playing;
    if (!isPlaying) {
      console.log("Recording has started");
      recognition.start();
    } else if (isPlaying) {
      recognition.stop();
      console.log("Recording has stopped");
    }
    this.setState({ first: false, playing: !isPlaying });
  }

  render() {
    return (
      <div className="main" style={{ paddingTop: 100 }}>
        <div>
          <img src={logo} width="25%" alt="logo" />
          <h2 className="addPadding">
            " {this.state.question} "
          </h2>
        </div>
        <div className="addPadding">
          <img src={this.state.playing === false ? play : pause} alt={this.state.playing ? "recordAction" : "PAUSED"} onClick={this.recordAction} style={{ cursor: "pointer" }} />
        </div>
        <div className="addPadding">
          {this.state.transcript.length === 0 || this.state.playing === true ?
            <button className="button" onClick={this.recordAction}>
              <h2 style={{ cursor: "pointer" }}> {this.state.playing === true ? "Stop Recording" : "Start Recording"} </h2>
            </button> :
            <div className="group">
              <div className="groupbutton">
                <button className="button" onClick={this.recordAction}>
                  <h2 style={{ cursor: "pointer" }}> Continue </h2>
                </button>
              </div>
              <div className="groupbutton">
                <button className="button" onClick={this.recordAction}>
                  <h2 style={{ cursor: "pointer" }}> Restart </h2>
                </button>
              </div>
              <div className="groupbutton">
                <Link to={{pathname: "/results", state: {data: this.state.transcript, question: this.state.question}}}>
                  <button className="accentButton" >
                    <h2 style={{ cursor: "pointer" }}> Analyze </h2>
                  </button>
                </Link>
              </div>
            </div>
          }
          <div className="errorMessage">
            {this.state.transcript.length === 0 && this.state.first === false && this.state.playing === false ? "Sorry, no audio was found. Please try again" : "\t"}
          </div>
        </div>
        <div>
          <p className="slogan">
            Don't like the question? Click <span onClick={this.changeQ} style={{ textDecoration: "underline", cursor: "pointer" }}>here</span> for a new one
          </p>
        </div>
      </div>
    );
  }
}

const questions = [
  "What qualities do you look for in a company's culture?",
  "What life lesson would you give to your former self?",
  "Describe an scenario in which you worked in a team environment?",
  "Desrcibe a time in which you overcame a challenge",
  "Who is your role model and why?",
  "What is your greatest weakness?",
  "What is your proudest accomplishment?",
  "What is your strongest quality?",
  "What are you most passionate about?",
]
