import {
  GET_MYPOSTS,
  GET_MYPOSTS_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
} from '../types';

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
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case UPDATE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, comments: payload.comments }
            : post
        ),
      };
    case GET_MYPOSTS_ERROR:
      return {
        ...state,
        loading: false,
        myposts: [],
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        posts: [],
      };
    default:
      return state;
  }
}
