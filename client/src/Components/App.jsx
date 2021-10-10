import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Start from './Start';
import TwitterAnalysis from './TwitterAnalysis';

function App() {
  const [id, setId] = useState('1232319080637616128');

  function demoOnClick() {
    console.log('test');
  }

  return (

    <Router>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Start setId={setId} />}
          />
          <Route
            path="/twitteranalysis"
            render={() => <TwitterAnalysis id={id} />}
          />
        </Switch>
      </div>

    </Router>

  );
}

export default App;
