const initialState = {
  token: null,
};

// reducer para salvar o token no estado global (não está sendo usado no momento pois o token está sendo salvo no localStorage)
export const tokenRequest = (state = initialState, action) => {
  switch (action.type) {
  case 'TOKEN_REQUEST':
    return { ...state, token: action.token };
  default:
    return state;
  }
};
