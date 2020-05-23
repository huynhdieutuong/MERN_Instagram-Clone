import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getPosts } from '../../redux/actions/post';
import PostItem from './PostItem';
import CreatePost from './CreatePost';

const Feeds = ({ post: { loading, posts }, getPosts }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <main id='feed'>
      <CreatePost />
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </main>
  );
};

Feeds.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Feeds);
