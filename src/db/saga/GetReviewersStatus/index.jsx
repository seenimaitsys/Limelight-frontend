import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_REVIEWERSTATUS_REQUEST,
  GET_REVIEWERSTATUS_SUCCESS,
  GET_REVIEWERSTATUS_REQUEST_FAIL,
} from "../../actionTypes/GetReviewersStatus";
import { doGetReviewerStatus } from "../../../com/GetReviewersStatus";
function* fetchReviewerStatusCount() {
  //worker
  try {
    const json = yield call(doGetReviewerStatus);
    yield put({ type: GET_REVIEWERSTATUS_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({
      type: GET_REVIEWERSTATUS_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

export function* getReviewersStatusReducer() {
  //watcher
  yield takeLatest(GET_REVIEWERSTATUS_REQUEST, fetchReviewerStatusCount);
}
