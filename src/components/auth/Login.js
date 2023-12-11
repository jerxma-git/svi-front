import React, { useState } from 'react';
import { authenticate } from '../../api/base';
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, onRegistered }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  let navigate = useNavigate()

  const handleLogin =  (e) => {
      const credentials = { username, password };
      const response = authenticate(credentials)
      e.preventDefault()

      response.then(data => {
        const userId = data.data.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        const authkey = window.btoa(`${username}:${password}`);
        localStorage.setItem("authkey", authkey)

        navigate('/doctors')
      }).catch (error => {
        console.error('Error during login:', error);
        setError('An error occurred during login.');
      })
  };

  const register = () => {
    navigate('/register')
  }

  return (
      <div>
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
          <div>
              <p>Don't have an account yet?</p>
              <button onClick={register}>Register</button>
          </div>
      </div>
  );
};

export default Login;