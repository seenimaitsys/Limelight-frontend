import { put, takeLatest, call } from "redux-saga/effects";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";
import { doLogout } from "../../../com/logout";

function* setlogOut() {
  yield call(doLogout);
  yield put({ type: LOGOUT_SUCCESS, payload: undefined });
}

function* logoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, setlogOut);
}

export default logoutSaga;
