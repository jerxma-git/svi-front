import React, { useState } from 'react';
import { loginUser } from '../../api/auth';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const response = await loginUser(credentials);

      if (response.success) {
        onLogin(response.token); 
        // у нас вроде в куках JSESSION передается токен и аутентификация по сессиям 
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;