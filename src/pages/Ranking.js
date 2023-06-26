import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar para a tela inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
