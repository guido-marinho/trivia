const initialState = {
  name: '',
  email: '',
};

// reducer para salvar o nome e o email no estado global
export const user = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_NAME':
    return { ...state, name: action.name };
  case 'GET_EMAIL':
    return { ...state, email: action.email };
  default:
    return state;
  }
};
