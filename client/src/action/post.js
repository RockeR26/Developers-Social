import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REM_COMMENT,
} from "./type";

//Get posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//Update likes

//Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/likes/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/post/unlike/" + id);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete("/post/" + id);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//ADD post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = formData;
    const res = await axios.post("/post", body, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//Get post WITH ID

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get("/post/" + id);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//ADD COMMENT
export const addComment = (id, formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = formData;
    const res = await axios.post("/post/comment/" + id, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};

//delete COMMENT
export const deleteComment = (pid, cid) => async (dispatch) => {
  try {
    await axios.delete(`/post/comment/${pid}/${cid}`);
    dispatch({
      type: REM_COMMENT,
      payload: cid,
    });
    dispatch(setAlert("Comment Deleted", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: error.message,
        status: error.response.status,
      },
    });
  }
};
