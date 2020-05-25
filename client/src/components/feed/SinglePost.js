import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Popconfirm, message } from 'antd';

import AddComment from './AddComment';
import CommentItem from './CommentItem';
import ProfilePhotos from '../profile/ProfilePhotos';
import Spinner from '../layout/Spinner';

import { getPost, addLike, deletePost } from '../../redux/actions/post';

const SinglePost = ({
  auth,
  post: { loading, post, myposts },
  getPost,
  addLike,
  deletePost,
  match,
  history,
}) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  if (!post || loading) return <Spinner />;

  const { _id, image, text, likes, comments, date, user } = post;

  // Check liked
  let isLike = false;

  likes.forEach((like) => {
    if (like.user === auth.user._id) {
      isLike = true;
    }
  });

  const confirm = (e) => {
    deletePost(_id, history);
    message.success('Post Deleted');
  };

  return (
    <main id='profile'>
      <header className='profile__header'>
        <div className='photo single-post'>
          <div className='column-image'>
            <img src={`/uploads/photos/${image}`} alt='post' />
          </div>
          <div className='column-info'>
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
            <div className='photo__info'>
              <ul className='photo__comments'>
                <li className='photo__comment'>
                  <div>
                    <img
                      src={`/uploads/avatars/${user.avatar}`}
                      alt='avatar'
                      className='photo__avatar'
                    />
                  </div>
                  <span>
                    <span className='photo__comment-author'>{user.name}</span>{' '}
                    {text}
                    <span className='comment-time-ago'>
                      <Moment fromNow>{date}</Moment>
                    </span>
                  </span>
                </li>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      postId={_id}
                      single={true}
                    />
                  ))}
              </ul>
              <div className='photo__actions'>
                <span
                  onClick={() => addLike(_id, true)}
                  className='photo__action'
                >
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
              <span className='photo__time-ago'>
                <Moment fromNow>{date}</Moment>
              </span>
              <AddComment postId={_id} single={true} />
            </div>
          </div>
        </div>
      </header>
      <div className='divide-section'>
        More posts from <span>{user.name}</span>
      </div>
      <section className='profile__photos'>
        {myposts.length > 0 && (
          <ProfilePhotos
            posts={myposts.filter((post) => post._id !== _id).slice(0, 6)}
          />
        )}
      </section>
    </main>
  );
};

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addLike,
  deletePost,
})(SinglePost);
