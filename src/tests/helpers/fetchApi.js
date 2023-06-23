
const requestToken = 'https://opentdb.com/api_token.php?command=request'

// faz uma requisição de um token para a API
export const fecthToken = async () => {
  const response = await fetch(requestToken)
  const data = await response.json()
  return data
}

