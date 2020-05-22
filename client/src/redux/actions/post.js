import axios from 'axios';
import { GET_MYPOSTS, GET_MYPOSTS_ERROR } from '../types';

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
