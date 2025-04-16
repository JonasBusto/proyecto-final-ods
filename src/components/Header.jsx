import React from 'react';
import NavPage from './NavPage';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <div className='header-main'>
        <div className='d-flex justify-content-between align-items-center first-nav'>
          <Link to='/'>
            <img
              className='img-fluid'
              src='logo-footer.png'
              alt='logo_inicio_nav'
            />
          </Link>
          <a href='https://frt.utn.edu.ar/' target='_blank'>
            <img
              className='img-fluid'
              src='logo-header-utn.png'
              alt='logo_nav_utn_frt'
            />
          </a>
        </div>
      </div>
      <div className='nav-custom-div'>
        <NavPage />
      </div>
    </header>
  );
};

export default Header;
