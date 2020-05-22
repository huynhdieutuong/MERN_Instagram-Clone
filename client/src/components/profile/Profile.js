import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import ProfilePhotos from './ProfilePhotos';
import ProfileNoPost from './ProfileNoPost';

import { getMyPosts } from '../../redux/actions/post';

const Profile = ({
  auth: { user },
  post: { loading, myposts },
  getMyPosts,
}) => {
  useEffect(() => {
    getMyPosts();
    // eslint-disable-next-line
  }, []);

  const { avatar, name, email } = user;

  return (
    <main id='profile'>
      <header className='profile__header'>
        <div className='profile__column'>
          <img src={avatar} alt='avatar' />
        </div>
        <div className='profile__column'>
          <div className='profile__title'>
            <h3 className='profile__username'>{email}</h3>
            <Link to='/edit-profile'>Edit profile</Link>
            <i className='fas fa-cog fa-lg'></i>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getMyPosts })(Profile);
