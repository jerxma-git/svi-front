import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../api/base';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [role, setRole] = useState('Client')
  let navigate = useNavigate()

  const options = [
    'Client', 'Doctor'
  ];
  const defaultOption = options[0]

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
        <label className="Registration-form-label">Email required
          <input className="Registration-form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Password
          <input className="Registration-form-input" required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">First Name
          <input className="Registration-form-input" required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Last Name
          <input className="Registration-form-input" required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Middle Name
          <input className="Registration-form-input" required
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Date Of Birth
          <input className="Registration-form-input" required
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <label className="Registration-form-label">Role
          <Dropdown className="Registration-form-input" options={options} onChange={(e) => setRole(e.value)} value={defaultOption} placeholder="Select an option"/>
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