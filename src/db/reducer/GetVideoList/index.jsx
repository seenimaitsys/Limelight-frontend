import {
  INIT_GET_VIDEO_LIST_REQUEST,
  GET_VIDEO_LIST_REQUEST,
  GET_VIDEO_LIST_SUCCESS,
  GET_VIDEO_LIST_REQUEST_FAIL,
} from "../../actionTypes/GetVideosList";

const getVideoListReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_GET_VIDEO_LIST_REQUEST:
      state = { loading: true };
      break;
    case GET_VIDEO_LIST_REQUEST:
      state = { loading: true };
      break;
    case GET_VIDEO_LIST_REQUEST_FAIL:
      state = { loading: false };
      break;
    case GET_VIDEO_LIST_SUCCESS:
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

export default getVideoListReducer;
