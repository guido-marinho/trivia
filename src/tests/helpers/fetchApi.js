const URL_API = 'https://opentdb.com/api.php?amount=5&token=';
const requestToken = 'https://opentdb.com/api_token.php?command=request'

// faz uma requisição de um token para a API
export const fecthToken = async () => {
  const response = await fetch(requestToken)
  const data = await response.json()
  return data
}

// faz uma requisição de perguntas para a API
export const fetchAnswers = async () => {
  const token = localStorage.getItem('token');
  const api = `${ URL_API }${ token }`;
  const response = await fetch(api);
  const data = await response.json();
  return data;
};