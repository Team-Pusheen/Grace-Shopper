import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const _login = (ev)=> {
    ev.preventDefault();
    login({ username, password });
    navigate("/products");
  };
  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2>Login</h2>
        <form onSubmit={ _login }>
          <input
            placeholder='username'
            value = { username }
            onChange = { ev => setUsername(ev.target.value) }
            />
          <input
            placeholder='password'
            value={ password }
            type = "password"
            onChange = { ev => setPassword(ev.target.value) }
          />
          <button className='login-signup-btn'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
