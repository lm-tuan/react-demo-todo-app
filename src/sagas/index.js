import { watchFectTodoList, watchInsertUser, watchDeleteUser } from './user-saga';
import { fork } from "redux-saga/effects";
export function* rootSaga() {
    yield fork(watchFectTodoList);
    yield fork(watchInsertUser);
    yield fork(watchDeleteUser);
  }