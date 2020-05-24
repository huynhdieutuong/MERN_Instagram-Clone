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
  GET_POST,
  LOADING,
  LOADING2,
  UPDATE_LIKES_SINGLE,
  UPDATE_COMMENTS_SINGLE,
} from '../types';

export const setLoading = () => async (dispatch) => {
  dispatch({ type: LOADING });
};

export const setLoading2 = () => async (dispatch) => {
  dispatch({ type: LOADING2 });
};

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

export const addLike = (id, single = false) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    if (single) {
      dispatch({
        type: UPDATE_LIKES_SINGLE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data },
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const addComment = (id, text, single = false) => async (dispatch) => {
  text = text.trim() === '' ? null : text.trim();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/posts/comment/${id}`, { text }, config);

    if (single) {
      dispatch({
        type: UPDATE_COMMENTS_SINGLE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: { id, comments: res.data },
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const removeComment = (postId, commentId, single = false) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    if (single) {
      dispatch({
        type: UPDATE_COMMENTS_SINGLE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_COMMENTS,
        payload: { id: postId, comments: res.data },
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const createPost = (formData) => async (dispatch) => {
  dispatch(setLoading2());

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

    return true;
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

export const deletePost = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    if (history) {
      history.push('/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};

export const getPost = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.get(`/api/posts/${id}`);

    const res2 = await axios.get(`/api/posts/user/${res.data.user._id}`);

    dispatch({
      type: GET_POST,
      payload: { post: res.data, myposts: res2.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }
  }
};
