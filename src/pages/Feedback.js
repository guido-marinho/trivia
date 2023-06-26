import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { calculateAssertions } from '../helpers/calculateAssertions';

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
    const { assertions, score, history } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">{ calculateAssertions(assertions) }</h1>
        <Header />
        <div>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
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
