import { GET_PROFILE, PROFILE_ERR } from "./type";
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
