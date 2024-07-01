import {
  FORGET_USER_REQUEST,
  FORGET_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  CHECK_TOKEN_VALID_REQUEST,
  CHECK_TOKEN_VALID_SUCCESS,
} from "../../actionTypes/forgetPassword";

export const checkTokenisValidRequest = (params) => {
  return {
    type: CHECK_TOKEN_VALID_REQUEST,
    payload: params,
  };
};

export const checkTokenisValidSuccess = () => {
  return {
    type: CHECK_TOKEN_VALID_SUCCESS,
  };
};
export const forgetPasswordRequest = (params) => {
  return {
    type: FORGET_USER_REQUEST,
    payload: params,
  };
};

export const forgetPasswordSuccess = () => {
  return {
    type: FORGET_USER_SUCCESS,
  };
};
export const updatePasswordRequest = (params) => {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    payload: params,
  };
};

export const updatePasswordSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
};
