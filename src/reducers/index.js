import { combineReducers } from 'redux';
import users from './user.reducer';

const myReducer = combineReducers({
    users
});
export default myReducer;