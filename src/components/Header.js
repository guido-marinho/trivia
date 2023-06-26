import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = MD5(email).toString();
    const URL_ICON = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img src={ URL_ICON } alt="icon" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(Header);
