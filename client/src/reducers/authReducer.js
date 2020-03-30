import {Constants} from "../actions/index.js";

const initState = {
    loggedIn: false,
    userInfo: null,
};

const authReducer = (state = initState, action) => {

    switch(action.type){

        case Constants.SIGN_UP:{
            //Creat a push notification with the message from payload
            return state;
        }
        
        case Constants.SIGN_IN:{
            let newState = {...state, loggedIn: action.payload.loggedIn};
            return newState;
        }
        
        case Constants.SIGN_OUT:{
            let newState = {...state, loggedIn: action.payload.loggedIn};
            return newState;
        }
        
        case Constants.USER_INFO:{
            let newState = action.payload;
            return newState;
        }
        
        case Constants.ERROR:{
            //create an alert with the message from action.payload
            return state;
        }

        default: return state;
    }
}

export default authReducer; 