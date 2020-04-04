import axios from "axios";

import {Constants, getBoardList} from './index.js'
import { getBoard } from "./boardActions.js";

const sendCollabRequest=(boardId, title, username, email, recipient)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .post('./user/collab', {
                        boardId,
                        title, 
                        username, 
                        email, 
                        recipient
                    })
                        .then((response)=>{
                            if(response.status === 202){
                                dispatch({
                                    type: Constants.SEND_COLLAB,
                                    payload:{
                                        message: "Collaboration request was successfully sent"
                                    }
                                })
                            }
                            else{
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message: response.msg
                                    }
                                });
                            }})
    }
}                            

const collabAccept=(id, boardId)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .put('./user/collabAccept', {
                        boardId,
                        id
                    })
                        .then((response)=>{
                            if(response.status === 202){
                                dispatch(getCollabs(id));
                                dispatch(getBoardList(id));
                            }
                            else{
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Something went wrong"
                                    }
                                });
                            }})
    }
}                            

const collabReject=(id, boardId)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .put('./user/collabDeny', {
                        boardId,
                        id
                    })
                        .then((response)=>{
                            if(response.status === 202){
                                dispatch(getCollabs(id));
                            }
                            else{
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Something went wrong"
                                    }
                                });
                            }})
    }
}

const getCollabs=(id)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .get('./user/collab', {
                        params:{
                            id
                        }
                    })
                        .then((response)=>{
                            if (response.data.collabs) {
                                dispatch({
                                    type: Constants.GET_COLLABS,
                                    payload: {
                                        collabs: response.data.collabs
                                    }
                                })
                            } 
                            else{
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Something went wrong"
                                    }
                                });
                            }})
    }
}

const deleteCollab = (email, boardId, id) =>{
    return (dispatch, getState) =>{
        return  axios
                    .delete('/user/collab',{
                        params:{
                            email,
                            boardId
                        }
                    })
                        .then((response)=>{
                            if(response.status === 202){
                                dispatch(getBoard(boardId));
                                dispatch(getBoardList(id));
                            }
                            else{
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

export {
    sendCollabRequest,
    collabAccept,
    collabReject,
    getCollabs,
    deleteCollab
}