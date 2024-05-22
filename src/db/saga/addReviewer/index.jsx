import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADDREVIEWER_REQUEST,
  ADDREVIEWER_SUCCESS,
  ADDREVIEWER_REQUEST_FAIL,
} from "../../actionTypes/addReviewer";
import { doInsertNewReviewer } from "../../../com/AddReviewer";
//generater function
function* fetchReviewer(params) {
  // const json = yield call(checkLogin, params.payload);
  // yield put({ type: LOGIN_SUCCESS, payload: json.data });
  try {
    const json = yield call(doInsertNewReviewer, params.payload);
    yield put({ type: ADDREVIEWER_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({ type: ADDREVIEWER_REQUEST_FAIL, payload: error.message });
  }
}
//study
function* addReviewerSaga() {
  yield takeLatest(ADDREVIEWER_REQUEST, fetchReviewer);
}

export default addReviewerSaga;
