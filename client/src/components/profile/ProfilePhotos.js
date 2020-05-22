import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfilePhotoItem from './ProfilePhotoItem';

const ProfilePhotos = ({ posts }) => {
  return (
    <Fragment>
      {posts.map((post) => (
        <ProfilePhotoItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

ProfilePhotos.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default ProfilePhotos;
