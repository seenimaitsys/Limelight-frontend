import {
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  INIT_GET_VIDEO_REQUEST,
  GET_VIDEO_REQUEST_FAIL,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_REQUEST_FAIL,
} from "../../actionTypes/Getvideos";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";

const getVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
    case LOGOUT_REQUEST:
      state = {};
      break;

    case INIT_GET_VIDEO_REQUEST:
      state = { loading: false, success: false };
      break;
    case GET_VIDEO_REQUEST:
      state = { loading: true, success: false };
      break;
    case GET_VIDEO_REQUEST_FAIL:
      state = { loading: false, success: false };
      break;
    case GET_VIDEO_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,

        ...action.payload,
      };
      break;
    case UPDATE_VIDEO_REQUEST:
      state = { loading: true, success: false };
      break;
    case UPDATE_VIDEO_REQUEST_FAIL:
      state = { loading: false, success: false };
      break;
    case UPDATE_VIDEO_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default getVideoReducer;
