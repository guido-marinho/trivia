/* retorno da api https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean
{
    "response_code":3,
}
    retorna a pagina de login e exclui do local storage o token

    api das perguntas https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
*/

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { handleApi } from '../tests/helpers/fetchApi';

class Game extends React.Component {
  state = {
    data: {},
    index: 0,
  };

  async componentDidMount() {
    await this.co();
  }

  componentDidUpdate() {
    const { history } = this.props;
    const { data } = this.state;
    const three = 3;
    if (data.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  co = async () => {
    const a = await handleApi();
    this.setState({
      data: a,
    });
  };

  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  };

  answers = () => {
    const { data, index } = this.state;
    const { results } = data;
    if (results.length > 0) {
      const answers = results[index]?.incorrect_answers;
      const correct = results[index]?.correct_answer;
      const allAnswers = [...answers, correct];
      const shuffle = this.shuffleArray(allAnswers);
      return shuffle;
    }
    return [];
  };

  // caso o token tenha expirado atualiza o localStorage com novo token e faz a requisição novamente

  render() {
    const { data, index } = this.state;
    const { results } = data;
    return (
      <div>
        { results === undefined ? <p>Loading...</p>
          : (
            <div>
              <header>
                <Header />
              </header>
              <h1 data-testid="settings-title">Game</h1>
              <h2 data-testid="question-category">{ results[index]?.category }</h2>
              <h3 data-testid="question-text">{ results[index]?.question }</h3>
              <div data-testid="answer-options">
                { this.answers().map((answer, i) => (
                  <button
                    key={ i }
                    data-testid={ answer === results[index]?.correct_answer
                      ? 'correct-answer' : `wrong-answer-${i}` }
                    className={ answer === results[index]?.correct_answer
                      ? 'correct' : 'wrong' }
                  >
                    { answer }
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
