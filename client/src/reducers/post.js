import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REM_COMMENT,
} from "../action/type";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REM_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((c) => c._id !== payload),
        },
        loading: false,
      };
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    }
    case POST_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}