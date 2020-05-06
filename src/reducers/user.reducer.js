import * as types from "./../consts/";
import _ from "lodash";

var initialState = {
  users: [],
  loading: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    // fetch data
    case types.API_CALL_REQUEST:
      return { ...state, loading: true };

    case types.API_CALL_SUCCESS:
      return { ...state, users: action.data, loading: false };

    case types.API_CALL_FAILURE:
      return { ...state, loading: false};

    // inser data
    case types.ADD_TASK_REQUEST:
      return { ...state };

    case types.ADD_TASK_SUCCESS:
      // insert on UI
      return {
        ...state,
        users: [...state.users, action.user],
        openForm: false
      };

    case types.ADD_TASK_FAILURE:
      return { ...state };

    
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
          loading: false 
        };
  
      case types.DELETE_TASK_FAILURE:
        return { ...state, loading: false };

    default:
      return { ...state };
  }
};
export default users;
