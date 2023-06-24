import React from 'react';
// import logo from './trivia.png';
import './App.css';
// import { render } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  /* <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
    </div> */
  );
}
