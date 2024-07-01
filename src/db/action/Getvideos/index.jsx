/* eslint-disable react-refresh/only-export-components */
import {
  GET_VIDEO_REQUEST,
  INIT_GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_REQUEST_FAIL,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_REQUEST_FAIL,
} from "../../actionTypes/Getvideos";

export const initGetVideoRequest = (params) => {
  return {
    type: INIT_GET_VIDEO_REQUEST,
    payload: params,
  };
};

export const getVideoRequest = (params) => {
  return {
    type: GET_VIDEO_REQUEST,
    payload: params,
  };
};

export const getVideoSuccess = () => {
  return {
    type: GET_VIDEO_SUCCESS,
  };
};

export const GetVideoRequestFail = (error) => {
  return {
    type: GET_VIDEO_REQUEST_FAIL,
    payload: error,
  };
};
export const updateVideoRequest = (params) => {
  return {
    type: UPDATE_VIDEO_REQUEST,
    payload: params,
  };
};

export const updateVideoSuccess = () => {
  return {
    type: UPDATE_VIDEO_SUCCESS,
  };
};

export const updateVideoRequestFail = (error) => {
  return {
    type: UPDATE_VIDEO_REQUEST_FAIL,
    payload: error,
  };
};
