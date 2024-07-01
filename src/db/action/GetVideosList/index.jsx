/* eslint-disable react-refresh/only-export-components */
import {
  INIT_GET_VIDEO_LIST_REQUEST,
  GET_VIDEO_LIST_REQUEST,
  GET_VIDEO_LIST_SUCCESS,
  GET_VIDEO_LIST_REQUEST_FAIL,
} from "../../actionTypes/GetVideosList";

export const initGetVideoListRequest = (params) => {
  return {
    type: INIT_GET_VIDEO_LIST_REQUEST,
    payload: params,
  };
};

export const getVideoLstRequest = (params) => {
  return {
    type: GET_VIDEO_LIST_REQUEST,
    payload: params,
  };
};

export const getVideoListSuccess = () => {
  return {
    type: GET_VIDEO_LIST_SUCCESS,
  };
};

export const GetVideoListRequestFail = (error) => {
  return {
    type: GET_VIDEO_LIST_REQUEST_FAIL,
    payload: error,
  };
};
