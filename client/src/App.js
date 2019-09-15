import React from 'react';
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Recording from "./pages/Recording.js";
import Results from "./pages/Results.js";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/record" component={Recording} />
          <Route path="/results" component={Results} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
