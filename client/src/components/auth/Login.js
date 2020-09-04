import React, { useState, useContext } from 'react';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';
import { useEffect } from 'react';
const Login = (props) => {
  const authcontext = useContext(authContext);
  const alertcontext = useContext(alertContext);
  const { login, isAuthenticated, error, clearerrors } = authcontext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if ((error = 'User already exists')) {
      alertcontext.setalert(error);
      clearerrors();
    }
  }, [error, isAuthenticated, props.history]);
  const [user, Setuser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  onchange = (e) => {
    Setuser({ ...user, [e.target.name]: e.target.value });
  };
  onsubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onsubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            onChange={onchange}
            name='email'
            value={email}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            onChange={onchange}
            name='password'
            value={password}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};
export default Login;
