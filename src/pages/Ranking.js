import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Ranking.css';
import logoTrivia from '../img/logo-trivia.png';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    console.log(getRanking);

    return (
      <>

        <div className="ranking-container">
          <img src={ logoTrivia } alt="logo-trivia" className="trivia-ranking" />
          <div className="ranking">
            <p
              data-testid="ranking-title"
              className="ranking-title"
            >
              Ranking

            </p>
            {
              getRanking.map((palyer, index) => {
                const { name, score, email } = palyer;

                const gravatar = () => {
                  const hash = md5(email);
                  return `https://www.gravatar.com/avatar/${hash}`;
                };
                return (
                  <div key={ index } className="player-ranking">
                    <div className="player">
                      <img
                        src={ gravatar() }
                        alt={ `player-img-${index}` }
                        className="player-img"
                      />
                      <p data-testid={ `player-name-${index}` }>{name}</p>
                    </div>
                    <p
                      data-testid={ `player-score-${index}` }
                      className="player-score"
                    >
                      {`${score} pontos`}

                    </p>
                  </div>
                );
              })
            }
          </div>
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          className="btn-go-home"
        >
          Voltar para a tela inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default Ranking;
