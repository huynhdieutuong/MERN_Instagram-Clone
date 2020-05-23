import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPost } from '../../redux/actions/post';

const CreatePost = ({ createPost, post: { error, loading2 } }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', text);
    createPost(formData);

    if (!loading2 && error.length === 0) {
      setText('');
      setFile('');
      setFileName('');
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className='photo'>
      <div className='photo__info'>
        <form
          onSubmit={onSubmit}
          className='photo__add-comment-container create-post'
        >
          <div className='input-file-container'>
            <input
              className='input-file'
              id='my-file'
              type='file'
              onChange={onChange}
            />
            <label htmlFor='my-file' className='input-file-trigger'>
              Select a photo...
            </label>
          </div>
          <span>{fileName}</span>
          <textarea
            name='text'
            placeholder="What's on your mind?"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            type='submit'
            disabled={text === '' ? true : false}
            className={text === '' ? '' : 'opacity1'}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
