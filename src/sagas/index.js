import { watchFectTodoList, watchInsertUser, watchDeleteUser, watchUserEditing, watchUserUpdate } from './user-saga';
import { fork } from "redux-saga/effects";
export function* rootSaga() {
    yield fork(watchFectTodoList);
    yield fork(watchInsertUser);
    yield fork(watchDeleteUser);
    yield fork(watchUserEditing);
    yield fork(watchUserUpdate);
  }