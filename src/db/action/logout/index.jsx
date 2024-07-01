import { LOGOUT_REQUEST, REMOVEVIDEOREDUCER } from "../../actionTypes/logout";

export const logoutRequest = (params) => {
  return {
    type: LOGOUT_REQUEST,
    payload: params,
  };
};
export const RemoveVideoReducer = () => {
  return {
    type: REMOVEVIDEOREDUCER,
  };
};
