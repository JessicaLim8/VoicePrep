import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './custom.css';
import './style.css';
import 'react-circular-progressbar/dist/styles.css';
import classnames from 'classnames';
import Wrapper from '../layout/wrapper.js';
import { wordCounter } from './wordcounter.js';
import { Link } from 'react-router-dom';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentiment: '-',
      text: this.props.location.state ? this.props.location.state.data : '',
      question: this.props.location.state ? this.props.location.state.question : '',
      showTranscript: true,
      keywords: '',
    }
  }

  async componentDidMount() {
    const documents = [{
      id: '1',
      text: this.state.text,
      language: 'en',
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
    this.setState({
      sentiment: Math.round(result.sentiment.documents[0].score*100),
      keywords: result.phrases.documents[0].keyPhrases,
    });
  }

  switchState = () => {
    this.setState((prevState) => {
      return {showTranscript: !prevState.showTranscript};
    });
  }

  countWords = (isFiller, text = []) => {
    return Object.entries(wordCounter(this.state.text, isFiller, text)).map(([key,value]) => {
      if (isFiller ? value > 0 : value > 1) {
        return (
          <p className={classnames({"listWords": true, "warn": value > 5})}>
            {key.charAt(0).toUpperCase() + key.substring(1)} : {value.toString()}
          </p>);
      };
      return null;
    })
  }

  render() {
    const progressBarStyle =
      buildStyles({
        strokeLinecap: 'round',
        textSize: '16px',
        pathTransitionDuration: 0.5,
        pathColor: this.state.sentiment ? `rgba(3,0,193, ${this.state.sentiment})` : 'white',
        textColor: 'white',
        trailColor: 'white',
      })

    const transcriptElement =
      (this.state.showTranscript &&
        <div>
          <p className="transcript">
            {this.state.text.split(' ').map(( i ) => {
              console.log(i);
              if (i === "like") {
                return (<span className="bold">{i} </span>)
              }
              return (i + ' ');
            })}
          </p>
        </div>
      );

    return (
      <Wrapper>
        <div className="main">
          <div style={{paddingTop: -10, paddingBottom: 15}}>
            <h1> Your Results </h1>
            <p className="slogan" style={{fontStyle:"italic"}}>
              " {this.state.question} "
            </p>
            {transcriptElement}
            <div className="vertGroup">
              <div className="positivity">
                <h2> Sentiment </h2>
                <CircularProgressbar
                  className="progressCircle"
                  value={typeof(this.state.sentiment) == 'number' ? this.state.sentiment : 0 }
                  text={`${this.state.sentiment}%`}
                  styles={progressBarStyle}
                />
              </div>
              <div className="filler">
                <h2> Filler Words </h2>
                {this.countWords(true)}
              </div>
              <div className="filler">
                <h2> Key Phrases </h2>
                {this.countWords(false, this.state.keywords)}
              </div>
            </div>
          </div>
          <div className="group" style={{padding: 10, right: 5, bottom: 5}}>
            <div className="groupbutton">
              <Link to="/record">
                <button className="button">
                  <h2 style={{cursor: "pointer"}}>Continue Practicing</h2>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
