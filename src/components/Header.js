import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';
import logoTrivia from '../img/logo-trivia.png';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = MD5(email).toString();
    const URL_ICON = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header className="header-container">
        <img src={ logoTrivia } alt="logo-trivia" className="trivia-header" />
        <div className="header">
          <div className="user-header">
            <img src={ URL_ICON } alt="icon" data-testid="header-profile-picture" />
            <p data-testid="header-player-name">{ name }</p>
          </div>
          <p data-testid="header-score">{ `${score} pontos` }</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
