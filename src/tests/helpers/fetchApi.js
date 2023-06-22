// const URL_BASE  = `https://opentdb.com/api.php?amount=10&token=${token}`
const requestToken = 'https://opentdb.com/api_token.php?command=request'
// const recoverToken = 'https://opentdb.com/api_token.php?command=request' // memso endereço do requestToken
// const resetToken = `https://opentdb.com/api_token.php?command=reset&token=${token}`

// faz uma requisição de um token para a API
export const fecthToken = async () => {
  const response = await fetch(requestToken)
  const data = await response.json()
  return data
}

