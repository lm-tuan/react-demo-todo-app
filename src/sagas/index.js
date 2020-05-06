import { watchFectTodoList } from './user-saga';
import { fork } from "redux-saga/effects";
export function* rootSaga() {
    console.log('saga-hello')
    yield fork(watchFectTodoList);
  }