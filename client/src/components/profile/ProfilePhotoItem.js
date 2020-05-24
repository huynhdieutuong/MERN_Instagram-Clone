import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilePhotoItem = ({ post: { _id, image, likes, comments } }) => {
  return (
    <div className='profile__photo'>
      <span
        className='profile__photo-background'
        style={{ backgroundImage: `url(/uploads/photos/${image})` }}
      ></span>
      <Link to={`/posts/${_id}`} className='profile__photo-overlay'>
        <span className='overlay__item'>
          <i className='fas fa-heart'></i>
          {likes.length}
        </span>
        <span className='overlay__item'>
          <i className='fas fa-comment'></i>
          {comments.length}
        </span>
      </Link>
    </div>
  );
};

ProfilePhotoItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ProfilePhotoItem;
