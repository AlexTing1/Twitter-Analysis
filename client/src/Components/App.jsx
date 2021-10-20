import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Start from './Start';
import TwitterAnalysis from './TwitterAnalysis';
import css from './css/app.css';

//  Initialization of the App. App.jsx maps the router paths of the web application.
function App() {
  const [id, setId] = useState('1232319080637616128');

  return (

    <Router>
      <div classsName={css.root}>
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
