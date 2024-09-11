import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_REQUEST_FAIL,
  INIT_LOGIN_REQUEST,
} from "../../actionTypes/login";

export const initLoginRequest = () => {
  return {
    type: INIT_LOGIN_REQUEST,
  };
};

export const loginRequest = (params) => {
  return {
    type: LOGIN_REQUEST,
    payload: params,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const loginRequestFail = (error) => {
  return {
    type: LOGIN_REQUEST_FAIL,
    payload: error,
  };
};
