import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_VIDEO_LIST_REQUEST,
  GET_VIDEO_LIST_SUCCESS,
  GET_VIDEO_LIST_REQUEST_FAIL,
} from "../../actionTypes/GetVideosList";
import { getVideoList } from "../../../com/GetVideoList";

///getAll video list
function* fetchVideoList(params) {
  //worker
  try {
    const json = yield call(getVideoList, params.payload);
    yield put({ type: GET_VIDEO_LIST_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({ type: GET_VIDEO_LIST_REQUEST_FAIL, payload: error.message });
  }
}

export function* getVideoListSaga() {
  //watcher
  yield takeLatest(GET_VIDEO_LIST_REQUEST, fetchVideoList);
}
