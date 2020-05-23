import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import post from './post';
import notification from './notification';

export default combineReducers({
  alerts,
  auth,
  post,
  notification,
});
