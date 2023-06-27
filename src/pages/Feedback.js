import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Feedback.css';
import { calculateAssertions } from '../helpers/calculateAssertions';
import logoTrivia from '../img/logo-trivia.png';

class Feedback extends Component {
  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const { name, score, email } = this.props;

    const newPlayer = {
      name,
      score,
      email,
    };

    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const newRanking = [...ranking, newPlayer];
    const sortRanking = newRanking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(sortRanking));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score, email, history } = this.props;
    const hash = MD5(email).toString();
    const URL_ICON = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div className="feedback-container">
        <img src={ logoTrivia } alt="logo-trivia" className="trivia-feedback" />
        <div className="feedback-user-container">
          <div className="feddback-user">
            <img
              src={ URL_ICON }
              alt="icon"
              data-testid="header-profile-picture"
              className="img-profile-feedback"
            />
          </div>
          <div className="feedback-perfomance">
            <h1 data-testid="feedback-text">{ calculateAssertions(assertions) }</h1>
            <div>
              <p
                data-testid="feedback-total-question"
              >
                { `Você acertou ${assertions} questões!` }

              </p>
              <p
                data-testid="feedback-total-score"
              >
                { `Um total de ${score} pontos` }

              </p>
            </div>
          </div>
        </div>
        <div className="feedback-buttons">
          <button
            data-testid="btn-play-again"
            onClick={ this.handleClick }
            className="btn-play-again"
          >
            Play Again

          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="btn-ranking"
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Feedback);
