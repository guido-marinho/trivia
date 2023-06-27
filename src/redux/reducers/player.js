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
    return { ...state, name: action.name, score: 0, assertions: 0 };
  case 'GET_EMAIL':
    return { ...state, email: action.email };
  case 'GET_SCORE':
    return { ...state,
      score: action.score + state.score,
      assertions: state.assertions + 1 };

  default:
    return state;
  }
};
