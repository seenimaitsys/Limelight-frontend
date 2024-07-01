import { combineReducers } from "redux";

import addReviewer from "../../db/reducer/addReviewer";
import loginReducer from "../../db/reducer/login";
import logoutReducer from "../../db/reducer/logout";
import getVideoReducer from "../../db/reducer/Getvideos";
import getVideoListReducer from "../../db/reducer/GetVideoList";
import getReviewersStatusReducer from "../../db/reducer/GetReviewersStatus";
import validJWTReducer from "../../db/reducer/validJWT";
import forgetPasswordReducer from "../../db/reducer/forgetPassword";
const appReducer = combineReducers({
  loginReducer,
  logoutReducer,
  getVideoReducer,
  getVideoListReducer,
  getReviewersStatusReducer,
  addReviewer,
  validJWTReducer,
  forgetPasswordReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
