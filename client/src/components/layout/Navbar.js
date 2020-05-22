import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../images/loginLogo.png';

const Navbar = ({ auth: { user } }) => {
  return (
    <nav className='navigation'>
      <div className='navigation__column'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>
      <div className='navigation__column'>
        <i className='fas fa-search'></i>
        <input type='text' placeholder='Search' />
      </div>
      <div className='navigation__column'>
        <ul className='navigations__links'>
          <li className='navigation__list-item'>
            <Link to='#!' className='navigation__link'>
              <i className='far fa-compass fa-lg'></i>
            </Link>
          </li>
          <li className='navigation__list-item'>
            <Link to='#!' className='navigation__link'>
              <i className='far fa-heart fa-lg'></i>
            </Link>
          </li>
          <li className='navigation__list-item'>
            <Link to='/profile' className='navigation__link'>
              <img
                src={user.avatar}
                alt='avatar'
                className='navigation__avatar'
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
