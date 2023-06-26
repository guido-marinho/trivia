const initialState = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

// reducer para salvar o nome e o email no estado global
export const player = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_NAME':
    return { ...state, name: action.name };
  case 'GET_EMAIL':
    return { ...state, email: action.email };
  case 'GET_SCORE':
    return { ...state, score: action.score + state.score };
  case 'GET_ASSERTIONS':
    return { ...state, assertions: action.assertions + state.assertions };
  default:
    return state;
  }
};
