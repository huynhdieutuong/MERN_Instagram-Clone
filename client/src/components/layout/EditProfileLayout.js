import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const EditProfileLayout = ({ auth: { user }, children }) => {
  const editProfile = useRef(null);
  const changePassword = useRef(null);
  const changeEmail = useRef(null);

  useEffect(() => {
    const currentTab = localStorage.getItem('currentTabEdit');

    if (currentTab === 'edit-profile') {
      editProfile.current.focus();
    }

    if (currentTab === 'change-password') {
      changePassword.current.focus();
    }

    if (currentTab === 'change-email') {
      changeEmail.current.focus();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar />
      <main id='edit-profile'>
        <ul className='edit-profile__menu'>
          <li>
            <Link ref={editProfile} to='/edit-profile'>
              Edit Profile
            </Link>
          </li>
          <li>
            <Link ref={changePassword} to='/change-password'>
              Change Password
            </Link>
          </li>
          <li>
            <Link ref={changeEmail} to='/change-email'>
              Change Email
            </Link>
          </li>
        </ul>
        <div className='edit-profile__container'>
          <header className='edit-profile__header'>
            <div className='edit-profile__avatar-container'>
              <img
                src={`/uploads/avatars/${user.avatar}`}
                className='edit-profile__avatar'
                alt='avatar'
              />
            </div>
            <h4 className='edit-profile__username'>{user.email}</h4>
          </header>
          {children}
        </div>
      </main>
    </Fragment>
  );
};

EditProfileLayout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EditProfileLayout);
