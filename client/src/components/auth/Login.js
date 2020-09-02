import React, { useState } from 'react';

const Login = () => {
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
    console.log('User Logined');
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onsubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' onChange={onchange} name='email' value={email} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            onChange={onchange}
            name='password'
            value={password}
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
