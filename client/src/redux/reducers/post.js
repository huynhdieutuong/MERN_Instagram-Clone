import { GET_MYPOSTS, GET_MYPOSTS_ERROR } from '../types';

const initialState = {
  myposts: [],
  posts: [],
  post: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MYPOSTS:
      return {
        ...state,
        loading: false,
        myposts: payload,
      };
    case GET_MYPOSTS_ERROR:
      return {
        ...state,
        loading: false,
        myposts: [],
      };
    default:
      return state;
  }
}
