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
    <div>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
