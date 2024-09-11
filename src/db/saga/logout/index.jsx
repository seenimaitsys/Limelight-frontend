import { put, takeLatest, call } from "redux-saga/effects";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes/logout";
import { doLogout } from "../../../com/logout";

function* setlogOut() {
  try {
    yield call(doLogout);
    yield put({ type: LOGOUT_SUCCESS, payload: {} });
  } catch (error) {
    yield put({ type: LOGOUT_REQUEST, payload: error.message });
  }
}

function* logoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, setlogOut);
}

export default logoutSaga;
