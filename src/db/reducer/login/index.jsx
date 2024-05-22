import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  INIT_LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
} from "../../actionTypes/login";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
    case LOGOUT_REQUEST:
      state = {};
      break;
    case INIT_LOGIN_REQUEST:
      state = { loading: false, success: false };
      break;
    case LOGIN_REQUEST:
      state = { loading: true, success: false };
      break;
    case LOGIN_REQUEST_FAIL:
      state = { loading: false };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        // accessToken: action.payload.accessToken,
        // refreshToken: action.payload.refreshToken,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default loginReducer;
