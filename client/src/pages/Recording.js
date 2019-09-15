import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import play from "./play.png";
import pause from "./pause.png";
import logo from "../Text-logo.png";

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
      question: questions[Math.floor(Math.random() * 10)],
      recognition: recognition,
      first: true
    }

    this.state.recognition.onresult = this.handleListen.bind(this)
  }

  handleListen = (event) => {
    if (event.results[0][0].confidence >= 0.85) {
      this.setState({ transcript: event.results[0][0] })
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
      recognition.start();
      console.log("starting to record")
    } else if (isPlaying) {
      recognition.stop();
      console.log("recording has stopped");
    }
    this.setState({ first: false, playing: !isPlaying });
  }

  analyze = () => {
    console.log(this.state.transcript)
  }

  render() {
    return (
<<<<<<< HEAD
        <div className="main" style={{paddingTop: 100}}>
          <div>
            <Link to="/">
              <img src={logo} width="20%" alt="logo"/>
            </Link>
            <h2 style={{paddingTop: 50}}>
              " {this.state.question} "
            </h2>
          </div>
          <div style={{padding: 20}}>
            <img src={this.state.playing === false ? play : pause} alt={this.state.playing ? "recordAction" : "PAUSED"} onClick={this.recording} style={{cursor: "pointer"}}/>
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
<<<<<<< HEAD
                  <Link to="/results">
                    <button className="accentButton" onClick={this.analyze}>
                      <h2 style={{cursor: "pointer"}}> Analyze </h2>
                    </button>
                  </Link>
=======
                  <button className="accentButton" onClick={() => {
                    const documents = [{
                      id: '1',
                      text: this.state.transcript,
                      language:"en",
                    }]   
                  } 
                  } >
                    <h2 style={{cursor: "pointer"}}> Analyze </h2>
                  </button>
>>>>>>> update
                </div>
              </div>
            }
                <div style={{paddingTop: 15}}> {this.state.transcript.length === 0 && this.state.first === false && this.state.playing === false ? "No audio was found" : " "} </div>
          </div>
          <div>
            <p> Don't like the question? Click <span onClick={this.changeQ} style={{textDecoration: "underline", cursor: "pointer"}}>here</span> for a new one </p>
          </div>
=======
      <div className="main" style={{ paddingTop: 50 }}>
        <div>
          <img src={logo} width="15%" alt="logo" />
          <h2>
            " {this.state.question} "
            </h2>
        </div>
        <div style={{ padding: 20 }}>
          <img src={this.state.playing === true ? play : pause} alt={this.state.playing ? "recordAction" : "PAUSED"} onClick={this.recording} style={{ cursor: "pointer" }} />
        </div>
        {this.state.transcript.length === 0 && this.state.first === false && this.state.playing === false && "No audio was found"}
        <div style={{ padding: 20 }}>
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
                <button className="accentButton" onClick={async () => {
                  const documents = [{
                    id: '1',
                    text: this.state.transcript.transcript,
                    language: "en",
                  }]

                  console.log(this.state.transcript.transcript)

                  const response = await fetch('http://localhost:3001/analyze', {
                    method: 'POST', 
                    mode: 'cors', 
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(documents), // body data type must match "Content-Type" header
                  })

                  const json = await response.json()
                  alert(json.sentiment.documents[0].score*100)
                }
                } >
                  <h2 style={{ cursor: "pointer" }}> Analyze </h2>
                </button>
              </div>
            </div>
          }
        </div>
        <div>
          <p> Don't like the question? Click <span onClick={this.changeQ} style={{ textDecoration: "underline", cursor: "pointer" }}>here</span> for a new one </p>
        </div>
>>>>>>> connected front end to backend
      </div>
    );
  }
}

const questions = [
  "Tell me about yourself",
  "What is your strongest quality",
  "What is your greatest weakness",
  "Explain a time you overcame a challenge",
  "Provide an example of a time you worked in a team environment",
  "What is your proudest accomplishment",
  "What is a passion of yours",
  "What life lesson would you give to your former self",
  "Who is your role model and why",
  "What qualities do you look for in a company culture?"
]
