import { combineReducers } from "redux";

import addReviewer from "../../db/reducer/addReviewer";
import loginReducer from "../../db/reducer/login";
import logoutReducer from "../../db/reducer/logout";
import getVideoReducer from "../../db/reducer/Getvideos";

const appReducer = combineReducers({
  loginReducer,
  logoutReducer,
  getVideoReducer,
  addReviewer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
