import axios from "axios";

import {Constants} from './index.js'
import {getUserInfo} from './index.js'

const changeBoard=(id, boardId)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .put('/user/board', {
                        id,
                        boardId
                    })
                        .then(response => {
                            if (response.status === 201) {
                                dispatch(getUserInfo(true));
                                dispatch(getBoard(boardId))
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

const addBoard = (id, title)=>{

    return (dispatch, getState) => {

        return  axios
                    .post('/boards', {
                        title,
                        id
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

export  {
            changeBoard, 
            getBoard, 
            getBoardList, 
            addBoard, 
            addList, 
            addCard, 
            reorderList, 
            reorderCard, 
            persistUpdate
        };