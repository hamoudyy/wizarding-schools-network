import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
	<li><Link to="/">Home</Link>
        <li><Link to="/wizarding-schools">Wizarding Schools</Link></li>
        <li><Link to="/students">Students</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
