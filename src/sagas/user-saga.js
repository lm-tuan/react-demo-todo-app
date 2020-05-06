import { put, takeLatest } from "redux-saga/effects";
import { fetchData } from './../data-mocks';
import * as types from './../consts';
import { FetchAPi } from '../actions/'
function* fetchTodoList() {
    try {
      const response = yield fetchData();
      console.log(response);
      const data = response.data ? response.data:[] ;
      yield put(FetchAPi.success(data));
    } catch (err) {
      yield put(FetchAPi.fail(err));
    }
  }
  // listner watch actions
export function* watchFectTodoList() {
    yield takeLatest(types.API_CALL_REQUEST, fetchTodoList);
  }