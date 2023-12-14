import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../api/base';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [role, setRole] = useState('')
  let navigate = useNavigate()

  const handleRegistration = (e) => {
    const credentials = {username, password, firstName, lastName, middleName, dateOfBirth, role}
    const response = register(credentials)
    e.preventDefault()

    response.then(data => {
      const userId = data.data.id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      console.log(data.data)
      localStorage.setItem("role", data.data.role);
      const authkey = window.btoa(`${username}:${password}`);
      localStorage.setItem("authkey", authkey)

      navigate('/doctors')
    }).catch(err => {
      console.log(err)
    })
  }

  const login = () => {
    navigate('/login')
  }

  return (
    <div className="Registration-block">
      <form className="Registration-form" onSubmit={handleRegistration}>
        <label className="Registration-form-label">Email
          <input className="Registration-form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Password
          <input className="Registration-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">First Name
          <input className="Registration-form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Last Name
          <input className="Registration-form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Middle Name
          <input className="Registration-form-input"
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Date Of Birth
          <input className="Registration-form-input"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Role
          <input className="Registration-form-input"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <div className="Registration-form-button">
          <button className="Registration-form-button-click" type="submit">Register</button>
        </div>
      </form>
      <div className="Registration-login">
        <p>Already have an account?</p>
        <button className="Registration-login-button" onClick={login}>Log in</button>
      </div>
    </div>
  )
}

export default Register