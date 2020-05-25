import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../images/loginLogo.png';
import Spinner from './Spinner';
import Notifications from '../notification/Notifications';

import { getNotifications, setToggle } from '../../redux/actions/notification';

const Navbar = ({
  auth: { user },
  notification: { loading, notifications, toggle },
  getNotifications,
  setToggle,
}) => {
  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, []);

  const [current, setCurrent] = useState(localStorage.getItem('currentMenu'));

  const onChangeCurrent = (name) => {
    setCurrent(name);
    if (name === 'notification') {
      if (current === 'notification') {
        setCurrent('feeds');
      }
      setToggle(!toggle);
    } else {
      setToggle(false);
    }
  };

  // Count unread notification
  const count = notifications.reduce((sum, notification) => {
    if (!notification.isRead) {
      return sum + 1;
    }
    return sum;
  }, 0);

  if (!user || loading) return <Spinner />;

  return (
    <nav className='navigation'>
      <div
        className='navigation__column'
        onClick={() => onChangeCurrent('feeds')}
      >
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
          <li className='navigation__list-item navigation-notification'>
            {count > 0 && <div className='number-unread'>{count}</div>}
            <Link
              to='#!'
              className='navigation__link'
              onClick={() => onChangeCurrent('notification')}
            >
              {current === 'notification' ? (
                <i className='fas fa-heart fa-lg'></i>
              ) : (
                <i className='far fa-heart fa-lg'></i>
              )}
            </Link>
            {toggle && <Notifications />}
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
  notification: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});

export default connect(mapStateToProps, { getNotifications, setToggle })(
  Navbar
);
