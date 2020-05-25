import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin, Popconfirm } from 'antd';

import ProfilePhotos from './ProfilePhotos';
import ProfileNoPost from './ProfileNoPost';
import ChangeAvatar from './ChangeAvatar';

import { getMyPosts } from '../../redux/actions/post';
import { logout, stopLoading } from '../../redux/actions/auth';

const Profile = ({
  auth: { user },
  post: { loading, myposts },
  getMyPosts,
  logout,
  stopLoading,
}) => {
  useEffect(() => {
    localStorage.setItem('currentMenu', 'profile');
    getMyPosts();
    stopLoading();
    // eslint-disable-next-line
  }, []);

  const { avatar, name, email } = user;

  return (
    <main id='profile'>
      <header className='profile__header'>
        <div className='profile__column'>
          <ChangeAvatar avatar={avatar} />
        </div>
        <div className='profile__column'>
          <div className='profile__title'>
            <h3 className='profile__username'>{email}</h3>
            <Link
              to='/edit-profile'
              onClick={() =>
                localStorage.setItem('currentTabEdit', 'edit-profile')
              }
            >
              Edit profile
            </Link>
            <Popconfirm
              title='Are you sure logout?'
              onConfirm={() => logout()}
              okText='Yes'
              cancelText='No'
            >
              <Link to='#!'>
                <i className='fas fa-sign-out-alt'></i> Logout
              </Link>
            </Popconfirm>
          </div>
          <ul className='profile__stats'>
            <li className='profile__stat'>
              <span className='stat__number'>{myposts.length}</span> posts
            </li>
            <li className='profile__stat'>
              <span className='stat__number'>0</span> followers
            </li>
            <li className='profile__stat'>
              <span className='stat__number'>0</span> following
            </li>
          </ul>
          <p className='profile__bio'>
            <span className='profile__full-name'>{name}</span>
          </p>
        </div>
      </header>
      <div className='divide-section'></div>
      <section className='profile__photos'>
        {loading ? (
          <Spin />
        ) : myposts.length > 0 ? (
          <ProfilePhotos posts={myposts} />
        ) : (
          <ProfileNoPost />
        )}
      </section>
    </main>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getMyPosts: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getMyPosts, logout, stopLoading })(
  Profile
);
