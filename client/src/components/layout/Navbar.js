import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../images/loginLogo.png';
import Spinner from './Spinner';
import Notifications from '../notification/Notifications';

const Navbar = ({ auth: { user } }) => {
  const [toggleNotifications, setToggle] = useState(false);
  const [current, setCurrent] = useState(
    localStorage.getItem('currentMenu', '')
  );

  const onChangeCurrent = (name) => {
    localStorage.setItem('currentMenu', name);
    setCurrent(name);
    if (name === 'notification') {
      setToggle(!toggleNotifications);
    } else {
      setToggle(false);
    }
  };

  if (!user) return <Spinner />;

  return (
    <nav className='navigation'>
      <div className='navigation__column' onClick={() => onChangeCurrent('')}>
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
          <li
            className='navigation__list-item'
            onClick={() => onChangeCurrent('explore')}
          >
            <Link to='#!' className='navigation__link'>
              {current === 'explore' ? (
                <i className='fas fa-compass fa-lg'></i>
              ) : (
                <i className='far fa-compass fa-lg'></i>
              )}
            </Link>
          </li>
          <li
            className='navigation__list-item navigation-notification'
            onClick={() => onChangeCurrent('notification')}
          >
            <Link to='#!' className='navigation__link'>
              {current === 'notification' ? (
                <i className='fas fa-heart fa-lg'></i>
              ) : (
                <i className='far fa-heart fa-lg'></i>
              )}
            </Link>
            {toggleNotifications && <Notifications />}
          </li>
          <li
            className='navigation__list-item'
            onClick={() => onChangeCurrent('profile')}
          >
            <Link to='/profile' className='navigation__link'>
              <img
                src={`/uploads/avatars/${user.avatar}`}
                alt='avatar'
                className={
                  current === 'profile'
                    ? 'navigation__avatar navigation__avatar-focus'
                    : 'navigation__avatar'
                }
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
