import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { calculateAssertions } from '../tests/helpers/calculateAssertions';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">{ calculateAssertions(assertions) }</h1>
        <Header />
        <div>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
