import {
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR,
  UPDATE_NOTIFICATIONS,
  CLEAR_NOTIFICATION,
} from '../types';

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
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map((notification) =>
          notification._id === payload._id ? payload : notification
        ),
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.filter(
          (notification) => notification._id !== payload
        ),
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
