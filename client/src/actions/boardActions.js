import axios from "axios";

import {Constants} from './index.js'
import {getUserInfo} from './index.js'
import { getCollabs } from "./collabActions.js";

const changeBoard=(id, boardId, prevBoardId)=>{

    return (dispatch, getState) => {
        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const getBoard=(id)=>{
    
    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const getBoardList=(id)=>{
    return (dispatch, getState) => {

        return  axios
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
                            } 
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addBoard = (id, title, email, boardId)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addList = (id, title)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const addCard = (boardId, id, text)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const reorderList = (destinationIndex, draggableId, boardId)=>{

    return (dispatch, getState) => {
    
        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const reorderCard = (sourceId, destinationId, destinationIndex, draggableId, boardId)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
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

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const editBoard = (id, text, userId)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const deleteCard = (id, listId, boardId) =>{

    return (dispatch, getState)=>{
        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}

const editList = (id, text, boardId)=>{

    return (dispatch, getState) => {

        return  axios
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
                                        message:"Something went wrong"
                                    }
                                });
                            }
                        })
    }
}


const deleteList = (id, boardId) =>{

    return (dispatch, getState)=>{
        return  axios
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
                                        message:"Something went wrong"
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
        };