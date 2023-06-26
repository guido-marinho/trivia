import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { calculateAssertions } from '../tests/helpers/calculateAssertions';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">{ calculateAssertions(assertions) }</h1>
        <Header />
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
