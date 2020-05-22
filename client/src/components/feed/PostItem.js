import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { addLike } from '../../redux/actions/post';

import AddComment from './AddComment';

const PostItem = ({
  post: { _id, user, text, image, likes, comments, date },
  addLike,
  auth,
}) => {
  // Check liked
  let isLike = false;

  likes.forEach((like) => {
    if (like.user === auth.user._id) {
      isLike = true;
    }
  });

  return (
    <div className='photo'>
      <header className='photo__header'>
        <img
          src={`/uploads/avatars/${user.avatar}`}
          alt='avatar'
          className='photo__avatar'
        />
        <div className='photo__user-info'>
          <span className='photo__author'>{user.name}</span>
        </div>
      </header>
      <img src={`/uploads/photos/${image}`} alt='post' />
      <div className='photo__info'>
        <div className='photo__actions'>
          <span onClick={() => addLike(_id)} className='photo__action'>
            {isLike ? (
              <i className='fas fa-heart fa-lg red-heart'></i>
            ) : (
              <i className='far fa-heart fa-lg'></i>
            )}
          </span>
          <span className='photo__action'>
            <i className='far fa-comment fa-lg'></i>
          </span>
        </div>
        <span className='photo__likes'>{likes.length} likes</span>
        <div className='photo__user-info'>
          <span className='photo__location'>{text}</span>
        </div>
        <ul className='photo__comments'>
          {comments.length > 0 &&
            comments.map((comment) => (
              <li className='photo__comment' key={comment._id}>
                <span className='photo__comment-author'>{comment.name}</span>{' '}
                {comment.text}
              </li>
            ))}
        </ul>
        <span className='photo__time-ago'>
          <Moment fromNow>{date}</Moment>
        </span>
        <AddComment postId={_id} />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike })(PostItem);
