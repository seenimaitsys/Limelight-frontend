import {
  CHECK_TOKEN_VALID_REQUEST,
  CHECK_TOKEN_VALID_SUCCESS,
} from "../../actionTypes/forgetPassword";

const validJWTReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_TOKEN_VALID_REQUEST:
      state = { loading: true };
      break;
    case CHECK_TOKEN_VALID_SUCCESS:
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

export default validJWTReducer;
