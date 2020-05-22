import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import post from './post';

export default combineReducers({
  alerts,
  auth,
  post,
});
