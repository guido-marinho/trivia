import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    console.log(getRanking);

    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        {
          getRanking.map((palyer, index) => {
            const { name, score, email } = palyer;

            const gravatar = () => {
              const hash = md5(email);
              return `https://www.gravatar.com/avatar/${hash}`;
            };
            return (
              <div key={ index }>
                <img src={ gravatar() } alt={ `player-img-${index}` } />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            );
          })
        }
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

export default Ranking;
