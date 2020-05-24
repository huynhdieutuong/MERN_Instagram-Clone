import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const EditProfileLayout = ({ auth: { user }, children }) => {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem('currentTabEdit')
  );

  return (
    <Fragment>
      <Navbar />
      <main id='edit-profile'>
        <ul className='edit-profile__menu'>
          <li>
            <Link
              to='/edit-profile'
              className={currentTab === 'edit-profile' ? 'active' : ''}
              onClick={() => setCurrentTab('edit-profile')}
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <Link
              to='/change-password'
              className={currentTab === 'change-password' ? 'active' : ''}
              onClick={() => setCurrentTab('change-password')}
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to='/change-email'
              className={currentTab === 'change-email' ? 'active' : ''}
              onClick={() => setCurrentTab('change-email')}
            >
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
