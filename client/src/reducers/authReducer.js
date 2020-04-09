import {Constants} from "../actions/index.js";

const initState = {
    loggedIn: false,
    userInfo: null,
    message:{show:false, msg:{}}
};

const authReducer = (state = initState, action) => {

    switch(action.type){

        case Constants.SIGN_UP:{
            let newState = {...state, message:{show:true, msg:action.payload}};
            return newState;
        }
        
        case Constants.SIGN_IN:{
            let newState = {...state, loggedIn: action.payload.loggedIn, message:{show:true, msg: {error:action.payload.error, message:action.payload.message}}};
            return newState;
        }
        
        case Constants.SIGN_OUT:{
            let newState = {...state, loggedIn: action.payload.loggedIn, message:{show:false, msg:{} }};
            return newState;
        }
        
        case Constants.USER_INFO:{
            let newState = action.payload;
            return newState;
        }
        
        case Constants.TOGGLE_SHOW:{
            let newState = {...state, message:action.payload }
            return newState
        }

        case Constants.ERROR:{
            let newState = {...state, message:{show:true, msg:action.payload}};
            return newState;
        }

        default: return state;
    }
}

export default authReducer; 