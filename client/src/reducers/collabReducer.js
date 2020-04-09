import {Constants} from "../actions/index.js";

const initState = {
    users: [],
    send: {}
};

const collabReducer = (state = initState, action) => {

    switch(action.type){

        case Constants.SEND_COLLAB:{
            let newState = {...state, send:{show:true,msg:action.payload}}
            return newState;
        }
        
        case Constants.GET_COLLABS:{
            let newState = {...state, users:action.payload.collabs, send:{show:false, msg:{}} };
            return newState;
        }
        
        case Constants.TOGGLE_SHOW :{
            let newState = {...state, send:action.payload}
            return newState;
        } 

        case Constants.ERROR:{
            let newState = {...state, send:{show:true,msg:action.payload}}
            return newState;
        }

        default: return state;
    }
}

export default collabReducer; 