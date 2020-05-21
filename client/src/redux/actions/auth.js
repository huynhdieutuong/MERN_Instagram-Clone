import axios from 'axios';
import { setAlert } from './alerts';
import { LOADING, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

// Register User
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: LOADING });

    const res = await axios.post(
      '/api/auth/register',
      { name, email, password },
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
