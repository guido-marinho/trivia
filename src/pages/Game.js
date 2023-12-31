import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import Header from '../components/Header';

import '../css/Game.css';

import { calculateScore } from '../helpers/calculateScore';
import { fetchAnswers } from '../helpers/fetchApi';
import { shuffleArray } from '../helpers/shuffleArray';
import timerIcon from '../img/timer.png';
import { getScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    data: {},
    index: 0,
    time: 30,
    disabled: false,
    shuffle: [],
    isAnswered: false,
  };

  async componentDidMount() {
    await this.handleRequest();
    this.timeOut();
  }

  componentDidUpdate() {
    this.verifyToken();
  }

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

  // faz a requisição das perguntas e respostas e atualiza o estado com os dados
  handleRequest = async () => {
    const response = await fetchAnswers();
    this.setState({
      data: response,
    }, () => this.answers());
  };

  // função  para evento de click nos botões de resposta
  handleCLick = ({ target }) => {
    this.score(target);

    this.setState({
      disabled: true,
      isAnswered: true,
    });
    clearInterval(this.interval);
  };

  // função para o botão de proxima pergunta
  handleNextQuestion = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      time: 30,
      disabled: false,
      isAnswered: false,
    }), () => this.answers());

    this.timeOut();
  };

  // https://stackoverflow.com/questions/30427882/make-a-timer-using-setinterval link usado para fazer o timer
  timeOut = () => {
    const oneThousand = 1000;

    this.interval = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }));
      }
      if (time === 0) {
        clearInterval(this.interval);
        this.setState({
          disabled: true,
          time: 'Tempo esgotado',
        });
      }
    }, oneThousand);
  };

  // retorna um array com as respostas embaralhadas
  answers = () => {
    const { data, index } = this.state;
    const { results } = data;
    const { history } = this.props;

    const magicNumber = 4;

    if (index > magicNumber) {
      return history.push('/feedback');
    }

    if (results.length) {
      const wrongAnswers = results[index]?.incorrect_answers;
      const correctAnswers = results[index]?.correct_answer;
      const allAnswers = [...wrongAnswers, correctAnswers];
      const shuffle = shuffleArray(allAnswers);
      this.setState({
        shuffle,
      });
    }
    return [];
  };

  score = ({ innerText }) => {
    const { data, index, time } = this.state;
    const { results } = data;
    const { dispatch } = this.props;
    if (results[index]?.correct_answer === innerText) {
      dispatch(
        getScore(calculateScore(Number(time), results[index].difficulty.toString())),
      );
    }
  };

  //  verica se a resposta está correta e atualiza o estado com a resposta

  render() {
    const { data, index, time, disabled, shuffle, isAnswered } = this.state;
    const { results } = data;

    return (
      <div>
        { results === undefined ? <p>Loading...</p>
          : (
            <div>
              <header>
                <Header />
              </header>
              <main className="main-container">
                <div className="answer-container">
                  <div className="answer-category">
                    <h2 data-testid="question-category">{ results[index]?.category }</h2>
                  </div>
                  <h3
                    data-testid="question-text"
                    className="question"
                  >
                    { results[index]?.question }

                  </h3>
                  <span className="timer">
                    <img src={ timerIcon } alt="timer-icon" />
                    Tempo:
                    {' '}
                    { time }
                  </span>
                </div>
                <div data-testid="answer-options" className="answer-options">
                  { shuffle.map((answer, curr) => (
                    <button
                      type="button"
                      key={ curr }
                      onClick={ this.handleCLick }
                      disabled={ disabled }
                      data-testid={ answer === results[index]?.correct_answer
                        ? 'correct-answer' : `wrong-answer-${curr}` }
                      className={ isAnswered && (answer === results[index]?.correct_answer
                        ? 'correct ' : 'wrong ') }
                      id="btn-answer"
                    >
                      { answer }
                    </button>
                  ))}
                  {
                    isAnswered && (
                      <button
                        type="button"
                        data-testid="btn-next"
                        onClick={ this.handleNextQuestion }
                        className="btn-next"
                        disabled={ !isAnswered }
                      >
                        Next
                      </button>
                    )

                  }
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
