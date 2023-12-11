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
    <div>
      <form onSubmit={handleRegistration}>
        <label>Email
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>Middle Name
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <br />
        <label>Date Of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <label>Role
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <div>
        <p>Already have an account?</p>
        <button onClick={login}>Log in</button>
      </div>
    </div>
  )
}

export default Register