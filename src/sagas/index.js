import { watchFectTodoList, watchInsertUser, watchDeleteUser } from './user-saga';
import { fork } from "redux-saga/effects";
export function* rootSaga() {
    console.log('saga-hello')
    yield fork(watchFectTodoList);
    yield fork(watchInsertUser);
    yield fork(watchDeleteUser);
  }