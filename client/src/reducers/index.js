import {combineReducers} from 'redux';
import authReducer from "./authReducer.js"
import boardReducer from './boardReducer.js';

const reducer = combineReducers({
    authDetails: authReducer,
    boardDetails: boardReducer
});

export default reducer;