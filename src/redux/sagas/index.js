import { spawn } from "redux-saga/effects";

import usersSaga from "./users-sagas";

export default function* rootSaga() {
  yield spawn(usersSaga);
}
