import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from '../types';

const initialState = {
  notifications: [],
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: payload,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        notifications: [],
        error: payload,
      };
    default:
      return state;
  }
}
