import React from 'react';
// import logo from './trivia.png';
import './App.css';
// import { render } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
