import axios from 'axios';
import { setAlert } from './alerts';
import {
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CONFIRMATION_SUCCESS,
  CONFIRMATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SENDMAIL_SUCCESS,
  SENDMAIL_FAIL,
} from '../types';

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

// Confirmation Email
export const confirmationEmail = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(`/api/auth/confirmation/${token}`);

    dispatch({
      type: CONFIRMATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONFIRMATION_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: LOADING });

    const res = await axios.post(
      '/api/auth/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: LOADING });

    await axios.post('/api/auth/forgotpassword', { email }, config);

    dispatch({ type: SENDMAIL_SUCCESS });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert('error', error.msg)));
    }

    dispatch({ type: SENDMAIL_FAIL });
  }
};