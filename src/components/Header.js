import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  const username = localStorage.getItem("username");
  return (
    <header>
      <h1>Doctor Appointment Service</h1>
      <Navbar/>
      <p>Logged in as {username}</p>
    </header>
  );
};

export default Header;