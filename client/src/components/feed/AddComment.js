import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddComment = (props) => {
  const [comment, setComment] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
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

AddComment.propTypes = {};

export default AddComment;
