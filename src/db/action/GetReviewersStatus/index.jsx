/* eslint-disable react-refresh/only-export-components */
import {
  GET_REVIEWERSTATUS_REQUEST,
  INIT_GETREVIEWERSTATUS_REQUEST,
  GET_REVIEWERSTATUS_SUCCESS,
  GET_REVIEWERSTATUS_REQUEST_FAIL,
} from "../../actionTypes/GetReviewersStatus";

export const initReviewerStatusRequest = () => {
  return {
    type: INIT_GETREVIEWERSTATUS_REQUEST,
  };
};

export const getReviewerStatusRequest = () => {
  return {
    type: GET_REVIEWERSTATUS_REQUEST,
  };
};

export const getReviewerStatusSuccess = () => {
  return {
    type: GET_REVIEWERSTATUS_SUCCESS,
  };
};

export const GetReviewerStatusFail = (error) => {
  return {
    type: GET_REVIEWERSTATUS_REQUEST_FAIL,
    payload: error,
  };
};
