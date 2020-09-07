import {
  GET_PROFILE,
  PROFILE_ERR,
  UPDATE_PROFILE,
  DELETE_ACC,
  CLEAR_PROFILE,
} from "./type";
import axios from "axios";
import { setAlert } from "./alert";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "ProfileUdated" : "Profile created", "success"));
    if (!edit) history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error.response.data);
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//ADD EXPERIENCE
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error.response.data);
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error.response.data);
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/profile/experience/" + id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Deleted", "success"));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/profile/education/" + id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Deleted", "success"));
  } catch (error) {
    console.log(error.response.data);

    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete account and Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you Sure This CANNOT be undone!")) {
    try {
      await axios.delete("/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACC,
      });
      dispatch(setAlert("Your Account has been deleted", "danger"));
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
