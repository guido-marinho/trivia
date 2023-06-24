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
