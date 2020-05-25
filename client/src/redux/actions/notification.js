import axios from 'axios';

import {
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR,
  UPDATE_NOTIFICATIONS,
  CLEAR_NOTIFICATION,
  TOGGLE_NOTIFICATIONS,
} from '../types';

export const getNotifications = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/notifications');

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: NOTIFICATION_ERROR });
  }
};

export const markReadNotification = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/notifications/${id}`);

    dispatch({
      type: UPDATE_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: NOTIFICATION_ERROR });
  }
};

export const markAllReadNotifications = () => async (dispatch) => {
  try {
    const res = await axios.put('/api/notifications');

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: NOTIFICATION_ERROR });
  }
};

export const clearNotification = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notifications/${id}`);

    dispatch({
      type: CLEAR_NOTIFICATION,
      payload: id,
    });
  } catch (err) {
    dispatch({ type: NOTIFICATION_ERROR });
  }
};

export const clearAllNotifications = () => async (dispatch) => {
  try {
    const res = await axios.delete('/api/notifications');

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: NOTIFICATION_ERROR });
  }
};

export const setToggle = (toggle = false) => async (dispatch) => {
  dispatch({
    type: TOGGLE_NOTIFICATIONS,
    payload: toggle,
  });
};
