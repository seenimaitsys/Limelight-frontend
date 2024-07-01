import {
  GET_REVIEWERSTATUS_REQUEST,
  INIT_GETREVIEWERSTATUS_REQUEST,
  GET_REVIEWERSTATUS_SUCCESS,
  GET_REVIEWERSTATUS_REQUEST_FAIL,
} from "../../actionTypes/GetReviewersStatus";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";
const getReviewersStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
    case LOGOUT_REQUEST:
      state = {};
      break;
    case INIT_GETREVIEWERSTATUS_REQUEST:
    case GET_REVIEWERSTATUS_REQUEST:
      state = { loading: true };
      break;
    case GET_REVIEWERSTATUS_REQUEST_FAIL:
      state = { loading: false };
      break;
    case GET_REVIEWERSTATUS_SUCCESS:
      state = {
        ...state,
        loading: false,

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

export default getReviewersStatusReducer;
