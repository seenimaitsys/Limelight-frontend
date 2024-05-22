import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";

const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
    case LOGOUT_REQUEST:
      state = {};
      break;
    default:
      break;
  }
  return state;
};

export default logoutReducer;
