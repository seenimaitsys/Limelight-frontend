import {
  INIT_LOGIN_REQUEST,
  ADDREVIEWER_REQUEST,
  ADDREVIEWER_SUCCESS,
  ADDREVIEWER_REQUEST_FAIL,
} from "../../actionTypes/addReviewer";

const addReviewerReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_LOGIN_REQUEST:
    case ADDREVIEWER_REQUEST:
      state = { loading: true };
      break;
    case ADDREVIEWER_REQUEST_FAIL:
      state = { loading: false };
      break;
    case ADDREVIEWER_SUCCESS:
      state = {
        ...state,
        loading: false,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default addReviewerReducer;
