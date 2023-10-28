import './Footer.css';
import React from 'react';

function Footer () {
  return (
    <footer>
      <div className="container">
        <p href="">&copy; {new Date().getFullYear()} code here</p>
      </div>
    </footer>
  );
};

export default Footer;
