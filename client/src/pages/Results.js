import React, {Component} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import './style.css';
import 'react-circular-progressbar/dist/styles.css';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Wrapper from '../layout/wrapper';
import {fillerWords} from "./variables";
import {wordCounter} from './wordcounter';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentiment: '-',
      text: this.props.location.state ? this.props.location.state.data : '',
      question: this.props.location.state ? this.props.location.state.question : '',
      keywords: '',
    };
  }

  async componentDidMount() {
    const documents = [{
      id: '1',
      text: this.state.text,
      language: 'en',
    }];

    const response = await fetch('http://localhost:3001/analyze', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documents),
    });

    const result = await response.json();
    this.setState({
      sentiment: Math.round(result.sentiment.documents[0].score * 100),
      keywords: result.phrases.documents[0].keyPhrases,
    });
  }

  buildWordCount = (wordList) => {
    const countedWords = wordCounter(this.state.text, wordList);
    const countList = [];
    Object.entries(countedWords).forEach(([key, value]) => {
      if (value > 0) {
        countList.push(
          <p className={classnames({listWords: true, warn: value > 5})}>
            {key.charAt(0).toUpperCase() + key.substring(1)} : {value}
          </p>
        );
      }
    });

    return countList.length === 0 ? 'No words found' : countList;
  };

  progressSummary = () => {
    if (this.state.sentiment > 90) {
      return <div className="positive"> Very Positive Response 😃</div>;
    } else if (this.state.sentiment > 80) {
      return <div className="positive"> Positive Response 😄</div>;
    } else if (this.state.sentiment > 70) {
      return <div className="positive"> Slightly Positive Response 🙂</div>;
    } else if (this.state.sentiment > 50) {
      return <div className="neutral"> Neutral Response 😐</div>;
    } else {
      return <div className="negative"> Negative Response 😔</div>;
    }
  };

  render() {
    const progressBarStyle = buildStyles({
      strokeLinecap: 'round',
      textSize: '16px',
      pathTransitionDuration: 0.5,
      pathColor: this.state.sentiment ? `rgba(3,0,193, ${this.state.sentiment})` : 'white',
      textColor: 'white',
      trailColor: 'white',
    });

    const transcriptWords = this.state.text.split(' ');
    const transcriptElement = (
      <div>
        <p className="transcript">
          &quot;{transcriptWords.map((word, index) => {
            let className = '';
            if (this.state.keywords.includes(word)) {
              className = 'keyHighlight';
            }
            if (fillerWords.includes(word)) {
              className = 'fillerHighlight';
            }
            return <span className={className}>{`${word}${index === transcriptWords.length - 1 ? '' : ' '}`}</span>;
          })}&quot;
        </p>
      </div>
    );

    return (
      <Wrapper>
        <div className="main">
          <h1 className="largePadding">Your Results</h1>
          <div className="">
            <div style={{marginTop: -10, paddingBottom: 15}}>
              <p className="question">{this.state.question}</p>
              {transcriptElement}
              <div className="horGroup">
                <div className="filler">
                  <h2> Filler Words </h2>
                  {this.buildWordCount(fillerWords)}
                </div>
                <div className="positivity">
                  <h2> Sentiment </h2>
                  <CircularProgressbar
                    className="progressCircle"
                    value={typeof (this.state.sentiment) === 'number' ? this.state.sentiment : 0}
                    text={`${this.state.sentiment}%`}
                    styles={progressBarStyle}
                  />
                  {this.progressSummary()}
                </div>
                <div className="filler">
                  <h2> Key Phrases </h2>
                  {this.buildWordCount(this.state.keywords)}
                </div>
              </div>
            </div>
          </div>
          <div className="largePadding" style={{margin: 10, right: 5, bottom: 5}}>
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
