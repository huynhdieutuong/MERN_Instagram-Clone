import axios from 'axios';

import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from '../types';

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
