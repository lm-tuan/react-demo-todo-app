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
        console.log('request', action)
      return { ...state, loading: true };

    case types.API_CALL_SUCCESS:
        console.log('success', action)
      return { ...state, users: action.data,loading: false };

    case types.API_CALL_FAILURE:
        console.log('fail', action)
      return {...state, loading: false};

    default:
      return { ...state };
      
  }
};
export default users;