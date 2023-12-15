import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="App-nav">
        <ul className="App-nav-bar">
          <li className="App-nav-bar-item">
            <Link to="/doctors">Doctors</Link>
          </li>
          { false &&
            <li className="App-nav-item">
              <Link to="/appointments">Appointments</Link>
            </li>
          }
        </ul>
    </nav>
  );
};

export default Navbar;