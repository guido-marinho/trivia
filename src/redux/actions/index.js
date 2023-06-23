// action para salvar o token no estado global
export const tokenRequest = (token) => ({
  type: 'TOKEN_REQUEST',
  token,
});

export const getName = (name) => ({
  type: 'GET_NAME',
  name,
});

export const getEmail = (email) => ({
  type: 'GET_EMAIL',
  email,
});
