import {
  ADDREVIEWER_REQUEST,
  ADDREVIEWER_SUCCESS,
  ADDREVIEWER_REQUEST_FAIL,
  INIT_LOGIN_REQUEST,
} from "../../actionTypes/addReviewer";

export const initLoginRequest = (params) => {
  return {
    type: INIT_LOGIN_REQUEST,
    payload: params,
  };
};
export const addReviewerRequest = (params) => {
  return {
    type: ADDREVIEWER_REQUEST,
    payload: params,
  };
};

export const addReviewerSuccess = () => {
  return {
    type: ADDREVIEWER_SUCCESS,
  };
};

export const AddReviewerRequestFail = (error) => {
  return {
    type: ADDREVIEWER_REQUEST_FAIL,
    payload: error,
  };
};
