import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fecthToken } from '../tests/helpers/fetchApi';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const response = await fecthToken();
    localStorage.setItem('token', response.token);
    history.push('/game');
  };

  isDisable = () => {
    const { email, name } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

    return !(regex.test(email) && name);
  };

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            value={ name }
            name="name"
            id="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            value={ email }
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ this.isDisable() }
          onClick={ this.handleSubmit }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
