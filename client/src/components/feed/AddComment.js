import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../redux/actions/post';

const AddComment = ({ postId, addComment }) => {
  const [comment, setComment] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, comment);
    setComment('');
  };

  return (
    <form onSubmit={onSubmit} className='photo__add-comment-container'>
      <textarea
        name='comment'
        placeholder='Add a comment...'
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        type='submit'
        disabled={comment === '' ? true : false}
        className={comment === '' ? '' : 'opacity1'}
      >
        Post
      </button>
    </form>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(AddComment);
