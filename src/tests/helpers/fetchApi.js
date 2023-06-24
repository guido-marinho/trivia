
const requestToken = 'https://opentdb.com/api_token.php?command=request'

// faz uma requisição de um token para a API
export const fecthToken = async () => {
  const response = await fetch(requestToken)
  const data = await response.json()
  return data
}

export const handleApi = async () => {
  const token = localStorage.getItem('token');
  const api = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(api);
  const data = await response.json();
  return data;
};