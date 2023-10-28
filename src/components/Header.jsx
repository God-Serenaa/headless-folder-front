import React from 'react';
import './Header.css';

function Header ({heading}) {
  return (
    <nav>
      <h1>{heading}</h1>
    </nav>
  );
};

export default Header;
