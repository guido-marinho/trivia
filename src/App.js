import React from 'react';
// import logo from './trivia.png';
import './App.css';
// import { render } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </>
  /* <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
    </div> */
  );
}
