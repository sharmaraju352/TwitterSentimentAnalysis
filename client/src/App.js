import React from 'react';
import 'assets/scss/blk-design-system-react.scss?v=1.0.0';
import 'assets/demo/demo.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Analysis from './components/Analysis';
import Candidates from './components/Candidates';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Candidates} />
        </Switch>
        <Switch>
          <Route exact path="/analysis" component={Analysis} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
