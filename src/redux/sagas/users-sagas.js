import { put, call, select, takeLatest, takeEvery } from "redux-saga/effects";

import {
  SET_LOADING,
  GET_USERS,
  GET_USERS_REQUESTED,
  GET_UNIQUE_USER,
  GET_UNIQUE_USER_REQUESTED,
} from "../actions/users-action";

import {
  fetchAllUsers,
  getOneUser,
  getUsersFromStore,
  fetchOneUserByID,
} from "../api/users-api";

function* getUsers() {
  yield put({ type: SET_LOADING });
  let users = yield select(getUsersFromStore);
  users.length === 0 && (users = yield call(fetchAllUsers));
  yield put({ type: GET_USERS, payload: users });
}

function* getUniqueUser({ id, method }) {
  yield put({ type: SET_LOADING });
  let users = yield select(getUsersFromStore);
  const uniqueUser = yield call(
    method === "fromClick" ? getOneUser : fetchOneUserByID,
    id,
    users
  );
  yield put({
    type: GET_UNIQUE_USER,
    payload: uniqueUser,
  });
}

export default function* todoSaga() {
  yield takeEvery(GET_USERS_REQUESTED, getUsers);
  yield takeLatest(GET_UNIQUE_USER_REQUESTED, getUniqueUser);
}
