import React, { useReducer } from 'react';
import authContext from '../auth/authContext';
import authReducer from '../auth/authReducer';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialstate = {
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    isAuthenticated: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialstate);

  const register = async (formdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formdata, config);
      console.log(res.data.token);
    } catch (error) {
      
    }
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        register,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
