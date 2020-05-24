import {
  GET_MYPOSTS,
  GET_MYPOSTS_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  ADD_POST,
  ADD_POST_ERROR,
  DELETE_POST,
  GET_POST,
  LOADING,
  LOADING2,
  UPDATE_LIKES_SINGLE,
  UPDATE_COMMENTS_SINGLE,
} from '../types';

const initialState = {
  myposts: [],
  posts: [],
  post: null,
  loading: true,
  loading2: false,
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADING2:
      return {
        ...state,
        loading2: true,
      };
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
        myposts: [],
        post: null,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case UPDATE_LIKES_SINGLE:
      return {
        ...state,
        post: { ...state.post, likes: payload },
        loading: false,
      };
    case UPDATE_COMMENTS_SINGLE:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
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
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        myposts: [payload, ...state.myposts],
        loading2: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        myposts: state.myposts.filter((post) => post._id !== payload),
        loading: false,
      };
    case GET_POST: {
      return {
        ...state,
        loading: false,
        post: payload.post,
        myposts: payload.myposts,
      };
    }
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
    case ADD_POST_ERROR:
      return {
        ...state,
        loading2: false,
        error: payload,
      };
    default:
      return state;
  }
}
