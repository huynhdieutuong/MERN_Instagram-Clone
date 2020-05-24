import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { removeComment } from '../../redux/actions/post';

const CommentItem = ({
  single,
  comment,
  postId,
  removeComment,
  auth: { user },
}) => {
  return (
    <li className='photo__comment'>
      {single && (
        <div>
          <img
            src={`/uploads/avatars/${comment.avatar}`}
            alt='avatar'
            className='photo__avatar'
          />
        </div>
      )}
      <span>
        <span className='photo__comment-author'>{comment.name}</span>{' '}
        {comment.text}
        {single && (
          <span className='comment-time-ago'>
            <Moment fromNow>{comment.date}</Moment>
          </span>
        )}
      </span>
      {comment.user === user._id && (
        <i
          className='fas fa-times remove-comment'
          onClick={() => removeComment(postId, comment._id, single)}
        ></i>
      )}
    </li>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
