import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./style.css";
import logo from "../images/Text-logo.png";
import play from "./images/play.png";
import pause from "./images/pause.png";

const webkitSpeechRecognition = window.webkitSpeechRecognition;
const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.autoStart = false;
recognition.interimResults = true;
recognition.lang = 'en-US';

export default class Recording extends Component {
  state = {
    transcript: '',
    playing: false,
    question: '',
    recognition,
    first: true,
  };

  constructor(props) {
    super(props);
    this.state.recognition.onresult = this.handleListen.bind(this);
  }

  componentDidMount() {
    this.changeQuestion();
  }

  handleListen = (event) => {
    if (event.results[0][0].confidence >= 0.75) {
      this.setState({transcript: event.results[0][0].transcript});
    }
  };

  changeQuestion = () => {
    this.setState({first: true, question: questions[Math.floor(Math.random() * (questions.length))]});
  };

  restart = () => {
    this.setState({transcript: "", first: true, playing: false});
    recognition.stop();
    this.toggleRecord();
  };

  toggleRecord = () => {
    if (this.state.playing) {
      recognition.stop();
    } else {
      recognition.start();
    }
    this.setState((prevState) => ({first: false, playing: !prevState.playing}));
  };

  render() {
    let recordButton = null;
    if (this.state.transcript.length === 0 || this.state.playing) {
      recordButton = (
        <button className="button" onClick={this.toggleRecord}>
          <h2 style={{cursor: "pointer"}}> {this.state.playing === true ? "Stop Recording" : "Start Recording"} </h2>
        </button>
      );
    } else {
      recordButton = (
        <div className="group">
          <div className="groupbutton">
            <button className="button" onClick={this.toggleRecord}>
              <h2 style={{cursor: "pointer"}}> Continue </h2>
            </button>
          </div>
          <div className="groupbutton">
            <button className="button" onClick={this.toggleRecord}>
              <h2 style={{cursor: "pointer"}}> Restart </h2>
            </button>
          </div>
          <div className="groupbutton">
            <Link to={{pathname: "/results", state: {data: this.state.transcript, question: this.state.question}}}>
              <button className="accentButton" >
                <h2 style={{cursor: "pointer"}}> Analyze </h2>
              </button>
            </Link>
          </div>
        </div>
      );
    }

    const errorMessage = this.state.transcript.length === 0 && !this.state.first && !this.state.playing ? 'Sorry, no audio was found. Please try again' : "\t";

    return (
      <div className="main" style={{paddingTop: 100}}>
        <div>
          <Link to="/">
            <img src={logo} width="25%" alt="logo" />
          </Link>
          <h2 className="addPadding">
            &quot;{this.state.question}&quot;
          </h2>
        </div>
        <div className="addPadding">
          <img src={this.state.playing ? pause : play} alt={this.state.playing ? "RECORDING" : "PAUSED"} onClick={this.toggleRecord} style={{cursor: "pointer"}} />
        </div>
        <div className="addPadding">
          {recordButton}
          <div className="errorMessage">
            {errorMessage}
          </div>
        </div>
        <div>
          <p className="slogan">
            Don&apos;t like the question? Click <span onClick={this.changeQuestion} style={{textDecoration: "underline", cursor: "pointer"}}>here</span> for a new one
          </p>
        </div>
      </div>
    );
  }
}

const questions = [
  "What is the biggest lesson you've learned while working in tech?",
  "What qualities do you look for in a company's culture?",
  "What life lesson would you give to your past self?",
  "Describe an scenario in which you worked in a team environment?",
  "Describe a time you faced diversity. How did you overcome it?",
  "Who is your role model and why?",
  "What is your greatest weakness, and what are you doing to improve upon it?",
  "What is your proudest accomplishment?",
  "What are you most passionate about?",
  "Tell me a time you disagreed with a coworker. How did you resolve the issue?",
  "Provide an example of a time you demonstrated initiative",
];
