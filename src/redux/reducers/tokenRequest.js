const initialState = {
  token: null,
};

export const tokenRequest = (state = initialState, action) => {
  switch (action.type) {
  case 'TOKEN_REQUEST':
    return { ...state, token: action.token };
  default:
    return state;
  }
};
