import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
};
