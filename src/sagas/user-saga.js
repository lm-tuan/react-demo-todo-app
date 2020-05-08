import { put, takeLatest, delay } from "redux-saga/effects";
import { fetchData } from "./../data-mocks";
import * as types from "./../consts";
import {
  FetchAPi,
  InsertUser,
  DeleteUser,
  UserEditing,
  UserUpdate,
} from "../actions/";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
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
  yield delay(1000);
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

function* userEditing(data) {
  // Check validate
  if (!data || !data.id) {
    yield put(UserEditing.fail(new Error("User Error !")));
  }
  // Request service
  yield put(UserEditing.success(data.id));
}

function* userUpdate(newData) {
 
  yield put(UserUpdate.success(newData.data));
  try {
    let lstStore = localStorage.getItem("lst");
    lstStore = JSON.parse(lstStore);
    const index = _.findIndex(lstStore.data, (item) => {
      return item.id === newData.data.id;
    });
    let data = [
      ...lstStore.data.slice(0, index),
      {
        id: newData.data.id,
        fname: newData.data.fname,
        fnumber: newData.data.fnumber,
      },
      ...lstStore.data.slice(index + 1),
    ];
    localStorage.setItem("lst", JSON.stringify({ data }));
  } catch (error) {
    yield put(UserUpdate.fail(error));
  }
}

function* deleteUser(idUser) {
  if (!idUser || !idUser.id) {
    yield put(DeleteUser.fail(new Error("User Error !")));
  }
  yield delay(1000);
  yield put(DeleteUser.success(idUser.id));
  // request server for update data
  try {
    let lstStore = localStorage.getItem("lst");
    if (!lstStore) {
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

export function* watchUserEditing() {
  yield takeLatest(types.TAKS_EDITING_REQUEST, userEditing);
}

export function* watchUserUpdate() {
  yield takeLatest(types.UPDATE_TASK_REQUEST, userUpdate);
}
