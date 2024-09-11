import { LOGOUT_SUCCESS, REMOVEVIDEOREDUCER } from "../../actionTypes/logout";

export const logoutRequest = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
export const RemoveVideoReducer = () => {
  return {
    type: REMOVEVIDEOREDUCER,
  };
};
