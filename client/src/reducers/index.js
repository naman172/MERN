import {combineReducers} from 'redux';
import authReducer from "./authReducer.js"
import boardReducer from './boardReducer.js';
import collabReducer from "./collabReducer.js"

const reducer = combineReducers({
    authDetails: authReducer,
    boardDetails: boardReducer,
    collabs: collabReducer
});

export default reducer;