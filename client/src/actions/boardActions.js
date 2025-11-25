import api from "../api.js";

import {Constants} from './index.js'
import {getUserInfo} from './index.js'
import { getCollabs } from "./collabActions.js";

const changeBoard=(id, boardId, prevBoardId)=>{

    return (dispatch, getState) => {
        return  api
                    .put('/user/board', {
                        id,
                        boardId,
                        prevBoardId
                    })
                        .then(response => {
                            if (response.status === 201) {
                                dispatch(getUserInfo(true));
                                dispatch(getBoard(boardId));
                                dispatch(getBoardList(id));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const getBoard=(id)=>{
    
    return (dispatch, getState) => {

        return  api
                    .get('/boards', {
                        params:{
                            id
                        }
                    })
                        .then(response => {
                            if (response.data.boardInfo) {
                                dispatch({
                                    type: Constants.BOARD_INFO,
                                    payload: {
                                        boardInfo: response.data.boardInfo
                                    }
                                })
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const getBoardList=(id, change)=>{
    return (dispatch, getState) => {

        return  api
                    .get('/user', {
                        params:{
                            id
                        }
                    })
                        .then(response => {
                            if (response.data.boardList) {
                                dispatch({
                                    type: Constants.USER_BOARDS,
                                    payload: {
                                        boardList: response.data.boardList
                                    }
                                })
                                
                                if(change){
                                    let selectedBoard = response.data.boardList.find((board)=>(board._id===change.boardId));
                                    if(selectedBoard){
                                        if(!selectedBoard.inUse){
                                        dispatch(changeBoard(change.id, change.boardId, change.prevBoardId));;
                                        }
                                        else{
                                            dispatch({
                                                type: Constants.ERROR,
                                                payload: {
                                                    show:false, // causes error if true 
                                                    msg:"It seems like someone is already working on this board."
                                                }
                                            });
                                        }
                                    }
                                    else{
                                        dispatch({
                                            type: Constants.ERROR,
                                            payload: {
                                                show:true,
                                                msg:"This board was deleted by the owner."
                                            }
                                        });
                                    }
                                }
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addBoard = (id, title, email, boardId)=>{

    return (dispatch, getState) => {

        return  api
                    .post('/boards', {
                        title,
                        id,
                        email,
                        boardId
                    })
                        .then(response => {
                            if (response.status === 201) {
                                dispatch(changeBoard(id, response.data.newBoard._id ));
                                dispatch(getBoardList(id));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addList = (id, title)=>{

    return (dispatch, getState) => {

        return  api
                    .post('/lists', {
                        title,
                        id
                    })
                        .then(response => {
                            if (response.status === 201) {
                                dispatch(getBoard(id));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addCard = (boardId, id, text)=>{

    return (dispatch, getState) => {

        return  api
                    .post('/cards', {
                        text,
                        id
                    })
                        .then(response => {
                            if (response.status === 201) {
                                dispatch(getBoard(boardId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const reorderList = (destinationIndex, draggableId, boardId)=>{

    return (dispatch, getState) => {
    
        return  api
                    .put('/boards/reorder', {
                        destinationIndex, 
                        draggableId, 
                        boardId
                    })
                        .then(response => {
                            if (response.status !== 202) {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const reorderCard = (sourceId, destinationId, destinationIndex, draggableId, boardId)=>{

    return (dispatch, getState) => {

        return  api
                    .put('/lists/reorder', {
                        sourceId, 
                        destinationId, 
                        destinationIndex,
                        draggableId,
                    })
                        .then(response => {
                            if (response.status !== 202) {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const persistUpdate = (sourceDropId, sourceDropIndex, destDropId, destDropIndex, type)=>{
    return (dispatch, getState) => {
        if(type==='list'){
            dispatch({
                type: Constants.PERSIST_LIST,
                payload: {
                    sourceDropIndex,
                    destDropIndex
                }
            })
        }
        else{
            dispatch({
                type: Constants.PERSIST_CARD,
                payload: {
                    sourceDropId,
                    sourceDropIndex,
                    destDropId, 
                    destDropIndex,
                }
    })
        }
    }
}

const deleteBoard = (id, userId)=>{

    return (dispatch, getState) => {

        return  api
                    .delete('/boards',  {
                        params:{
                            id
                        }
                    })
                        .then(response => {
                            if (response.status === 202) {
                                dispatch(getUserInfo());
                                dispatch(getBoard(""));
                                dispatch(getBoardList(userId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const editBoard = (id, text, userId)=>{

    return (dispatch, getState) => {

        return  api
                    .put('/boards',  {
                            id,
                            text
                    })
                        .then(response => {
                            if (response.status === 202) {
                                dispatch(getBoard(id));
                                dispatch(getBoardList(userId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const deleteCard = (id, listId, boardId) =>{

    return (dispatch, getState)=>{
        return  api
                    .delete('/cards', {
                        params: {
                            id,
                            listId
                        }
                    })
                        .then((response)=>{
                            if (response.status === 202) {
                                dispatch(getBoard(boardId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const editList = (id, text, boardId)=>{

    return (dispatch, getState) => {

        return  api
                    .put('/lists',  {
                            id,
                            text
                    })
                        .then(response => {
                            if (response.status === 202) {
                                dispatch(getBoard(boardId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}


const deleteList = (id, boardId) =>{

    return (dispatch, getState)=>{
        return  api
                    .delete('/lists', {
                        params: {
                            id,
                            boardId
                        }
                    })
                        .then((response)=>{
                            if (response.status === 202) {
                                dispatch(getBoard(boardId));
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        show:false,
                                        msg:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const syncUp = (id, boardId) =>{

    return (dispatch, getState)=>{
        dispatch(getBoard(boardId));
        dispatch(getBoardList(id));
        dispatch(getCollabs(id));
    }
}

const toggleMessage=()=>{

    return (dispatch, getState) =>{
        dispatch({
            type: Constants.TOGGLE_MESSAGE,
            payload: {show:false, msg:{}}
        })
    }
}


export  {
            changeBoard, 
            getBoard, 
            getBoardList, 
            addBoard, 
            addList, 
            addCard, 
            reorderList, 
            reorderCard, 
            persistUpdate,
            deleteBoard,
            editBoard,
            deleteCard,
            editList,
            deleteList,
            syncUp,
            toggleMessage
        };