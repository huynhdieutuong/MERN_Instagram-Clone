import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popconfirm, message } from 'antd';

import { addLike, deletePost } from '../../redux/actions/post';

import AddComment from './AddComment';
import CommentItem from './CommentItem';

const PostItem = ({
  post: { _id, user, text, image, likes, comments, date },
  addLike,
  auth,
  deletePost,
}) => {
  // Check liked
  let isLike = false;

  likes.forEach((like) => {
    if (like.user === auth.user._id) {
      isLike = true;
    }
  });

  const confirm = (e) => {
    deletePost(_id);
    message.success('Post Deleted');
  };

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
        {auth.user._id === user._id && (
          <Popconfirm
            title='Are you sure delete this post?'
            onConfirm={confirm}
            okText='Yes'
            cancelText='No'
          >
            <a href='#!' style={{ color: 'red' }}>
              Delete
            </a>
          </Popconfirm>
        )}
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
            <Link to={`/posts/${_id}`}>
              <i className='far fa-comment fa-lg'></i>
            </Link>
          </span>
        </div>
        <span className='photo__likes'>{likes.length} likes</span>
        <div className='photo__user-info'>
          <span className='photo__location'>{text}</span>
        </div>
        <ul className='photo__comments'>
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={_id} />
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
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, deletePost })(PostItem);
