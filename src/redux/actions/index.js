// action para salvar o token no estado global
export const tokenRequest = (token) => ({
  type: 'TOKEN_REQUEST',
  token,
});

// action para salvar o nome no estado global
export const getName = (name) => ({
  type: 'GET_NAME',
  name,
});

// action para salvar o email no estado global
export const getEmail = (email) => ({
  type: 'GET_EMAIL',
  email,
});

// action para somar o score no estado global
export const getScore = (score) => ({
  type: 'GET_SCORE',
  score,
});

// action para contar o número de acertos no estado global
export const getAssertions = (assertions) => ({
  type: 'GET_ASSERTIONS',
  assertions,
});
