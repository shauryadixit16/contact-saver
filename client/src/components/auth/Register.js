import React, { useState, useContext } from 'react';
import authContext from '../../context/auth/authContext';
const Register = () => {
  const authcontext = useContext(authContext);

  const [user, Setuser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;
  const { register } = authcontext;
  onchange = (e) => {
    Setuser({ ...user, [e.target.name]: e.target.value });
  };
  onsubmit = (e) => {
    e.preventDefault();
    register({
      name,
      email,
      password,
    });
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onsubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            onChange={onchange}
            name='name'
            value={name}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
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
            minLength={6}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='text'
            onChange={onchange}
            name='password2'
            value={password2}
            required
            minLength={6}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};
export default Register;
