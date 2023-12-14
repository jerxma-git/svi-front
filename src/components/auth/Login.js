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
      <div className="Login-block">
          <form className="Login-form" onSubmit={handleLogin}>
              <label className="Login-form-label">
                  Username:
                  <input className="Login-form-label-input"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
              </label>
              <br />
              <label className="Login-form-label">
                  Password:
                  <input className="Login-form-label-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </label>
              <br />
              <div className="Login-form-button">
                  <button className="Login-form-button-click" type="submit">Login</button>
              </div>

              {error && <p className="Login-form-error" style={{  color: 'red' }}>{error}</p>}
          </form>
          <div className="Login-registration">
              <p>Don't have an account yet?</p>
              <button className="Login-registration-button" onClick={register}>Register</button>
          </div>
      </div>
  );
};

export default Login;