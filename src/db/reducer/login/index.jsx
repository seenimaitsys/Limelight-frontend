import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  INIT_LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
} from "../../actionTypes/login";
import { LOGOUT_SUCCESS } from "../../actionTypes/logout";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      state = {};
      break;
    case INIT_LOGIN_REQUEST:
      state = {};
      break;
    case LOGIN_REQUEST:
      state = { loading: true };
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
