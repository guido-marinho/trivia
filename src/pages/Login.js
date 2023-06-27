import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Login.css';
import { fecthToken } from '../helpers/fetchApi';
import confiIcon from '../img/configuração.png';
import logoTrivia from '../img/logo-trivia.png';
import { getEmail, getName } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  // função que atualiza o estado com o valor do input
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // função que salva o nome e email no localStorage e redireciona para a pagina de jogo
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { history, dispatch } = this.props;

    const response = await fecthToken();
    localStorage.setItem('token', response.token);

    history.push('/game');

    dispatch(getName(name));
    dispatch(getEmail(email));
  };

  // função que verifica se o botão deve estar habilitado ou não
  isDisable = () => {
    const { email, name } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

    return !(regex.test(email) && name);
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="login-container">
        <img src={ logoTrivia } alt="logo-trivia" className="logo-trivia" />
        <div className="login-forms">
          <form>
            <label htmlFor="name">
              <input
                type="text"
                value={ name }
                name="name"
                id="name"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                placeholder="Qual seu nome?"
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
                placeholder="Qual seu e-mail do gravatar?"
              />
            </label>
            <button
              data-testid="btn-play"
              disabled={ this.isDisable() }
              onClick={ this.handleSubmit }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
              className="config-button"
            >
              <img src={ confiIcon } alt="icon" className="config-icon" />
              Settings
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
});

export default connect(mapStateToProps)(Login);
