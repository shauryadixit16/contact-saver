import React, { useReducer } from 'react';
import authContext from '../auth/authContext';
import authReducer from '../auth/authReducer';
import axios from 'axios';
import setauthtoken from '../../components/utils/setauthtoken';
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
  // load user
  const loaduser = async () => {
    if (localStorage.token) {
      setauthtoken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: AUTH_ERROR });
    }
  };
  // register
  const register = async (formdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formdata, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });

      loaduser();
    } catch (error) {
      console.log(error.message);
      dispatch({ type: REGISTER_FAIL, payload: error.response.msg });
    }
  };
  // login
  const login = async (formdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formdata, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      loaduser();
    } catch (error) {
      console.log(error.message);
      dispatch({ type: LOGIN_FAIL, payload: error.response.msg });
    }
  };
  // logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const clearerrors = () => {
    dispatch({ type: CLEAR_ERRORS });
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
        loaduser,
        clearerrors,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
