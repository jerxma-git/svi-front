import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
        <ul>
          <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;