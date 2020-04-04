import {Constants} from "../actions/index.js";

const initState = [];

const collabReducer = (state = initState, action) => {

    switch(action.type){

        case Constants.SEND_COLLAB:{
            //Creat a push notification with the message from payload
            return state;
        }
        
        case Constants.GET_COLLABS:{
            let newState = action.payload.collabs;
            return newState;
        }
        
        case Constants.ERROR:{
            //create an alert with the message from action.payload
            return state;
        }

        default: return state;
    }
}

export default collabReducer; 