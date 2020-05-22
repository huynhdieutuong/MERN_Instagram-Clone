import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_MYPOSTS,
  GET_MYPOSTS_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  UPDATE_LIKES,
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
