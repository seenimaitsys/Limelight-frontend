import { all, fork } from "redux-saga/effects";

import addReviewerSaga from "../db/saga/addReviewer";
import loginSaga from "../db/saga/login";
import logoutSaga from "../db/saga/logout";
import { getVideoSaga, updateVideoReviewSaga } from "../db/saga/Getvideos";
import { getVideoListSaga } from "../db/saga/GetVideosList";
import { getReviewersStatusReducer } from "../db/saga/GetReviewersStatus";
import {
  forgetPasswordSaga,
  updatePasswordSaga,
  checkTokenisValidSaga,
} from "../db/saga/forgetPassword";

export default function* rootSaga() {
  yield all([
    fork(addReviewerSaga),
    fork(loginSaga),
    fork(logoutSaga),
    fork(getVideoSaga),
    fork(updateVideoReviewSaga),
    fork(getVideoListSaga),
    fork(getReviewersStatusReducer),
    fork(forgetPasswordSaga),
    fork(updatePasswordSaga),
    fork(checkTokenisValidSaga),
  ]);
}
