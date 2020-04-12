import {Constants} from "../actions/index.js";

const initState = {
    boardInfo: {},
    boardList: [],
    message:{show:false, msg:""}
};

const boardReducer = (state = initState, action) => {

    switch(action.type){

        case Constants.BOARD_INFO:{
            let newState = {...state, boardInfo: action.payload.boardInfo, message:{show:false, msg:""}};
            return newState;
        }

        case Constants.USER_BOARDS:{
            let newState = {...state, boardList: action.payload.boardList, message:{show:false, msg:""}};
            return newState;
        }

        case Constants.PERSIST_LIST:{
            const {
                sourceDropIndex, 
                destDropIndex, 
            } = action.payload;
            
            const newState = {...state};
            const board = newState.boardInfo; 
            const list = board.lists.splice(sourceDropIndex, 1);
            board.lists.splice(destDropIndex, 0, ...list);
            
            return newState;
        }

        case Constants.PERSIST_CARD:{
            const {
                sourceDropId, 
                sourceDropIndex, 
                destDropId, 
                destDropIndex,
            } = action.payload;
            
            const newState = {...state};
            const board = newState.boardInfo;

            //in the same list
            if(sourceDropId === destDropId){
                const list = board.lists.find(list=>(list._id === sourceDropId))
                const card = list.cards.splice(sourceDropIndex, 1);
                list.cards.splice(destDropIndex, 0, ...card);
            } 

            //in some other list
            if(sourceDropId !== destDropId){
                const sourceList = board.lists.find(list=>(list._id === sourceDropId))
                const card = sourceList.cards.splice(sourceDropIndex, 1);
                const destList = board.lists.find(list=>(list._id === destDropId))
                destList.cards.splice(destDropIndex, 0, ...card);
            }    
        
            return newState;
        }

        case Constants.TOGGLE_MESSAGE:{
            let newState = {...state, message:action.payload };
            return newState
        }

        case Constants.ERROR:{
            let newState = {...state, message:action.payload};
            return newState;
        }

        default: return state;
    }
}

export default boardReducer; 