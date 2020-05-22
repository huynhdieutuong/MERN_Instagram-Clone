import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeComment } from '../../redux/actions/post';

const CommentItem = ({ comment, postId, removeComment, auth: { user } }) => {
  return (
    <li className='photo__comment'>
      <span>
        <span className='photo__comment-author'>{comment.name}</span>{' '}
        {comment.text}
      </span>
      {comment.user === user._id && (
        <i
          className='fas fa-times remove-comment'
          onClick={() => removeComment(postId, comment._id)}
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
