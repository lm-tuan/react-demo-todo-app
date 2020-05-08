import * as types from "./../consts/";

// class fetch Api
export class FetchAPi {
  static request() {
    return {
      type: types.API_CALL_REQUEST,
    };
  }
  static success(data) {
    return {
      type: types.API_CALL_SUCCESS,
      data,
    };
  }
  static fail(error) {
    return {
      type: types.API_CALL_FAILURE,
      error,
    };
  }
}

export class InsertUser {
  static request(user) {
    return {
      type: types.ADD_TASK_REQUEST,
      user,
    };
  }
  static success(user) {
    return {
      type: types.ADD_TASK_SUCCESS,
      user,
    };
  }
  static fail(error) {
    return {
      type: types.ADD_TASK_FAILURE,
      error,
    };
  }
}

export class DeleteUser {
  static request(id) {
    return {
      type: types.DELETE_TASK_REQUEST,
      id,
    };
  }
  static success(id) {
    return {
      type: types.DELETE_TASK_SUCCESS,
      id,
    };
  }
  static fail(error) {
    return {
      type: types.DELETE_TASK_FAILURE,
      error,
    };
  }
}

// edit
export class UserEditing{
  static request(id) {
    return {
      type: types.TAKS_EDITING_REQUEST,
      id,
    };
  }
  static success(id) {
    return {
      type: types.TAKS_EDITING_SUCCESS,
      id,
    };
  }
  static fail(error) {
    return {
      type: types.TAKS_EDITING_FAILUR,
      error,
    };
  }
}

export class UserUpdate{
  static request(data) {
    return {
      type: types.UPDATE_TASK_REQUEST,
      data,
    };
  }
  static success(data) {
    return {
      type: types.UPDATE_TASK_SUCCESS,
      data,
    };
  }
  static fail(error) {
    return {
      type: types.UPDATE_TASK_FAILURE,
      error,
    };
  }
}
