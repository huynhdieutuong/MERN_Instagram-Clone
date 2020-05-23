import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_MYPOSTS,
  GET_MYPOSTS_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  ADD_POST,
  ADD_POST_ERROR,
  DELETE_POST,
} from '../types';

export const getMyPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/me');

    dispatch({
      type: GET_MYPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_MYPOSTS_ERROR });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_POSTS_ERROR });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const addComment = (id, text) => async (dispatch) => {
  text = text.trim() === '' ? null : text.trim();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/posts/comment/${id}`, { text }, config);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: { id, comments: res.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: { id: postId, comments: res.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const createPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }

    dispatch({
      type: ADD_POST_ERROR,
      payload: errors,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};
