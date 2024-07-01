import {
  FORGET_USER_REQUEST,
  FORGET_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../../actionTypes/forgetPassword";

const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_USER_REQUEST:
      state = { loading: true };
      break;

    case FORGET_USER_SUCCESS:
      state = {
        ...state,

        ...action.payload,
      };
      break;
    case UPDATE_PASSWORD_REQUEST:
      state = { loading: true };
      break;

    case UPDATE_PASSWORD_SUCCESS:
      state = {
        ...state,

        ...action.payload,
      };
      break;

    default:
      break;
  }
  return state;
};

export default forgetPasswordReducer;
