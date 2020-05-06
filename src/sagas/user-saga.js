import { put, takeLatest } from "redux-saga/effects";
import { fetchData } from "./../data-mocks";
import * as types from "./../consts";
import { FetchAPi, InsertUser, DeleteUser } from "../actions/";
import { v4 as uuidv4 } from "uuid";
import _ from 'lodash'
function* fetchTodoList() {
  try {
    const response = yield fetchData();
    const data = response.data ? response.data : [];
    yield put(FetchAPi.success(data));
  } catch (err) {
    yield put(FetchAPi.fail(err));
  }
}
function* insertUser(data) {
  if (!data || !data.user) {
    yield put(InsertUser(new Error("User Error !")));
  }
  let newUser = {
    id: uuidv4(),
    fname: data.user.fname,
    fnumber: data.user.fnumber,
  };
  yield put(InsertUser.success(newUser));

  // request server send data user methods POST
  try {
    let data = [];
    let lstStore = localStorage.getItem("lst");
    if (!lstStore) {
      data.push(newUser);
      localStorage.setItem("lst", JSON.stringify({ data }));
    }
    lstStore = JSON.parse(lstStore);
    data = lstStore.data;
    data.push(newUser);
    localStorage.setItem("lst", JSON.stringify({ data }));
  } catch (error) {
    yield put(InsertUser.fail(error));
  }
}

function* deleteUser(idUser) {
  if (!idUser || !idUser.id) {
    yield put(DeleteUser.fail(new Error("User Error !")));
  }
  yield put(DeleteUser.success(idUser.id));
  // request server for update data
  try {
    let lstStore = localStorage.getItem("lst");
    if(!lstStore){
        yield put(DeleteUser.fail(new Error("User Error !")));
    }
    lstStore = JSON.parse(lstStore);
      const index = _.findIndex(lstStore.data, (item) => {
        return item.id === idUser.id;
      });
      let data = [
        ...lstStore.data.slice(0, index),
        ...lstStore.data.slice(index + 1),
      ];
      localStorage.setItem("lst", JSON.stringify({ data }));
  } catch (error) {
    yield put(DeleteUser.fail(error));
  }
}

// listner watch actions
export function* watchFectTodoList() {
  yield takeLatest(types.API_CALL_REQUEST, fetchTodoList);
}

export function* watchInsertUser() {
  yield takeLatest(types.ADD_TASK_REQUEST, insertUser);
}

export function* watchDeleteUser() {
  yield takeLatest(types.DELETE_TASK_REQUEST, deleteUser);
}
