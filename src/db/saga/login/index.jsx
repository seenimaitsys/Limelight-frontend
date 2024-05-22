import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_REQUEST_FAIL,
} from "../../actionTypes/login";
import { doLogin } from "../../../com/login";
//generater function
function* fetchLogin(params) {
  //worker
  // const json = yield call(checkLogin, params.payload);
  // yield put({ type: LOGIN_SUCCESS, payload: json.data });
  try {
    const json = yield call(doLogin, params.payload);
    yield put({ type: LOGIN_SUCCESS, payload: json.data });
  } catch (error) {
    yield put({ type: LOGIN_REQUEST_FAIL, payload: error.message });
  }
}
//study
function* loginSaga() {
  //watcher
  yield takeLatest(LOGIN_REQUEST, fetchLogin);
}

export default loginSaga;
