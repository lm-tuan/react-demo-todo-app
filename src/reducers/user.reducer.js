import * as types from "./../consts/";
import _ from "lodash";

var initialState = {
  users: [],
  loading: false,
  editing: {
    id: "",
    fname: "",
    fnumber: "",
  },
};

const users = (state = initialState, action) => {
  switch (action.type) {
    // fetch data
    case types.API_CALL_REQUEST:
      return { ...state, loading: true };

    case types.API_CALL_SUCCESS:
      return { ...state, users: action.data, loading: false };

    case types.API_CALL_FAILURE:
      return { ...state, loading: false };

    // inser data
    case types.ADD_TASK_REQUEST:
      return { ...state, loading: true };

    case types.ADD_TASK_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.user],
        loading: false,
      };

    case types.ADD_TASK_FAILURE:
      return { ...state, loading: false };

  // update 
  case types.UPDATE_TASK_FAILURE:
    return { ...state, loading: true };

  case types.UPDATE_TASK_SUCCESS:
    const i = _.findIndex(state.users, (item) => {
      return item.id === action.data.id;
    });
    return {
      ...state,
      users: [
        ...state.users.slice(0, i),
        {
          id: action.data.id,
          fname: action.data.fname,
          fnumber: action.data.fnumber
        },

        ...state.users.slice(i + 1),
      ],
      loading: false,
    };

 
  case types.UPDATE_TASK_FAILURE:
    return { ...state, loading: false };

    // delete data
    case types.DELETE_TASK_REQUEST:
      return { ...state, loading: true };

    case types.DELETE_TASK_SUCCESS:
      const index = _.findIndex(state.users, (item) => {
        return item.id === action.id;
      });
      // insert on UI
      return {
        ...state,
        users: [
          ...state.users.slice(0, index),
          ...state.users.slice(index + 1),
        ],
        loading: false,
      };

    case types.DELETE_TASK_FAILURE:
      return { ...state, loading: false };

      // task editing
      case types.TAKS_EDITING_REQUEST:
      return { ...state, loading: false };

    case types.TAKS_EDITING_SUCCESS:
      const idex = _.findIndex(state.users, (item) => {
        return item.id === action.id;
      });
      // insert on UI
      return {
        ...state,
        editing: state.users[idex],
        loading: false
      };

    case types.TAKS_EDITING_FAILUR:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
export default users;
