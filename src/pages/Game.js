/* retorno da api https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean
{
    "response_code":3,
}
    retorna a pagina de login e exclui do local storage o token

    api das perguntas https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
*/

import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import '../css/Game.css';
import { fetchAnswers } from '../tests/helpers/fetchApi';

class Game extends React.Component {
  state = {
    data: {},
    index: 0,
  };

  // faz a requisição das perguntas e respostas ao carregar a pagina
  async componentDidMount() {
    await this.handleRequest();
  }

  // verifica se o token expirou e atualiza o estado com o novo token
  componentDidUpdate() {
    const { history } = this.props;
    const { data } = this.state;

    const three = 3;

    if (data.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  // faz a requisição das perguntas e respostas e atualiza o estado com os dados
  handleRequest = async () => {
    const response = await fetchAnswers();
    this.setState({
      data: response,
    });
  };

  // embaralha as respostas
  shuffleArray = (array) => {
    // Loop em todos os elementos
    for (let index = array.length - 1; index > 0; index -= 1) {
      // Escolhendo elemento aleatório
      const shuffle = Math.floor(Math.random() * (index + 1));
      // Reposicionando elemento
      [array[index], array[shuffle]] = [array[shuffle], array[index]];
    }
    // Retornando array com aleatoriedade
    return array;
  };

  // retorna um array com as respostas embaralhadas
  answers = () => {
    const { data, index } = this.state;
    const { results } = data;
    if (results.length) {
      const wrongAnswers = results[index]?.incorrect_answers;
      const correctAnswers = results[index]?.correct_answer;
      const allAnswers = [...wrongAnswers, correctAnswers];
      const shuffle = this.shuffleArray(allAnswers);
      return shuffle;
    }
    return [];
  };

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
              <main>
                <h2 data-testid="question-category">{ results[index]?.category }</h2>
                <h3 data-testid="question-text">{ results[index]?.question }</h3>
                <div data-testid="answer-options">
                  { this.answers().map((answer, curr) => (
                    <button
                      type="button"
                      key={ curr }
                      data-testid={ answer === results[index]?.correct_answer
                        ? 'correct-answer' : `wrong-answer-${curr}` }
                      className={ answer === results[index]?.correct_answer
                        ? 'correct' : 'wrong' }
                    >
                      { answer }
                    </button>
                  ))}
                </div>
              </main>
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
