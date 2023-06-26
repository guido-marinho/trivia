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
    time: 30,
    disabled: false,
    shuffle: [],
  };

  async componentDidMount() {
    await this.handleRequest();
    this.timeOut();
  }

  componentDidUpdate() {
    this.verifyToken();
  }

  // faz a requisição das perguntas e respostas e atualiza o estado com os dados
  handleRequest = async () => {
    const response = await fetchAnswers();
    this.setState({
      data: response,
    }, () => this.answers());
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
      this.setState({
        shuffle,
      });
    }
    return [];
  };

  // https://stackoverflow.com/questions/30427882/make-a-timer-using-setinterval link usado para fazer o timer
  timeOut = () => {
    const oneThousand = 1000;

    const interval = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }));
      }
      if (time === 0) {
        clearInterval(interval);
        this.setState({
          disabled: true,
          time: 'Tempo esgotado',
        });
      }
    }, oneThousand);
  };

  // verifica se o token expirou e redireciona para a pagina de login caso tenha expirado
  verifyToken = () => {
    const { history } = this.props;
    const { data } = this.state;

    const three = 3;

    if (data.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const { data, index, time, disabled, shuffle } = this.state;
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
                <span>{ time }</span>
                <h2 data-testid="question-category">{ results[index]?.category }</h2>
                <h3 data-testid="question-text">{ results[index]?.question }</h3>
                <div data-testid="answer-options">
                  { shuffle.map((answer, curr) => (
                    <button
                      type="button"
                      key={ curr }
                      disabled={ disabled }
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
