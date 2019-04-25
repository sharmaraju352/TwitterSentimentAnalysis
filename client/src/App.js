import React from 'react';
import 'assets/scss/blk-design-system-react.scss?v=1.0.0';
import 'assets/demo/demo.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Analysis from './components/Analysis';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" render={props => <Analysis {...props} />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
