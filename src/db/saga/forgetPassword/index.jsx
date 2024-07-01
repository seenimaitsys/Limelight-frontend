import { call, put, takeLatest } from "redux-saga/effects";
import {
  FORGET_USER_REQUEST,
  FORGET_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  CHECK_TOKEN_VALID_REQUEST,
  CHECK_TOKEN_VALID_SUCCESS,
} from "../../actionTypes/forgetPassword";
import {
  checkTokenisValid,
  forgetPassword,
  updatePassword,
} from "../../../com/ForgetPassword";

function* fetchForgetPassword(params) {
  const json = yield call(forgetPassword, params.payload);
  yield put({ type: FORGET_USER_SUCCESS, payload: json.data });
}
function* fetchTokenisValid(params) {
  const json = yield call(checkTokenisValid, params.payload);
  yield put({ type: CHECK_TOKEN_VALID_SUCCESS, payload: json.data });
}

function* fetchUpdatePassword(params) {
  const json = yield call(updatePassword, params.payload);
  yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: json.data });
}

export function* checkTokenisValidSaga() {
  yield takeLatest(CHECK_TOKEN_VALID_REQUEST, fetchTokenisValid);
}
export function* forgetPasswordSaga() {
  yield takeLatest(FORGET_USER_REQUEST, fetchForgetPassword);
}
export function* updatePasswordSaga() {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, fetchUpdatePassword);
}
