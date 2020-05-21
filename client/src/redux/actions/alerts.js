import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

export const setAlert = (type, msg, timeout = 2000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { type, msg, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
