import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './Start';

function App() {
  function demoOnClick() {
    console.log('test');
  }

  return (
    <div>

      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Start} />
            {/* <Route path="/twitteranalysis" */}
          </Switch>
        </div>
      </Router>
      <div>
        <div>
          <button type="button" onClick={demoOnClick}> Demo </button>
        </div>
      </div>
    </div>
  );
}

export default App;
