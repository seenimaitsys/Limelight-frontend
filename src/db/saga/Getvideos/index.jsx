import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_REQUEST_FAIL,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_REQUEST_FAIL,
} from "../../actionTypes/Getvideos";
import { getUniqueVideo, videoReviewed } from "../../../com/Getvideos";
//generater function
function* fetchVideo(params) {
  //worker
  try {
    const json = yield call(getUniqueVideo, params.payload);
    yield put({ type: GET_VIDEO_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({ type: GET_VIDEO_REQUEST_FAIL, payload: error.message });
  }
}

function* updateVideoReview(params) {
  //worker

  try {
    const json = yield call(videoReviewed, params.payload);
    yield put({ type: UPDATE_VIDEO_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({ type: UPDATE_VIDEO_REQUEST_FAIL, payload: error.message });
  }
}
//study

export function* getVideoSaga() {
  //watcher
  yield takeLatest(GET_VIDEO_REQUEST, fetchVideo);
}

export function* updateVideoReviewSaga() {
  //watcher
  yield takeLatest(UPDATE_VIDEO_REQUEST, updateVideoReview);
}
