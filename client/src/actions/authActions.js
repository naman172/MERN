import axios from "axios";

import {Constants} from "./index.js";

import {toggleDrawer} from "../components/Sidebar.js";

const signUpReq=(username, email, password)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .post('/auth/signUp', {
                        username,
                        email,
                        password
                    })
                        .then(response => {
                            if (!response.data.msg) {
                                dispatch({
                                    type: Constants.SIGN_UP,
                                    payload: {
                                        error:false,
                                        message:"Successful Sign-up, Please Sign-in to continue."
                                    }
                                })
                            }
                            else {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        error:true,
                                        message:"This Email is already registered."
                                    }
                                })
                            }
                        })
                            .catch(error => {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        error:true,
                                        message:"Something went wrong"
                                    }
                                })
                            })
    }
}

const signInReq= (email, password)=>{

    return (dispatch, getState) => {
        
        return  axios
                    .post('/auth/signIn', {
                        email,
                        password
                    })
                        .then(response => {
                            if (response.status === 200) {
                                axios
                                    .get('/auth/user')
                                        .then(userResponse => {
                                            if (userResponse.data.user) {
                                                let id = userResponse.data.user._id;
                                                let boardOnDisplay = userResponse.data.user.boardOnDisplay;
                                                if(boardOnDisplay){
                                                    axios.all([
                                                        axios.get('/user', {params:{id}}),
                                                        axios.get('/boards', {params:{id: boardOnDisplay}})
                                                    ]).then(axios.spread((...responses) => {
                                                        const responseOne = responses[0]
                                                        const responseTwo = responses[1]
                                                        if(responseOne.data.boardList){
                                                            dispatch({
                                                                type: Constants.USER_BOARDS,
                                                                payload: {
                                                                    boardList: responseOne.data.boardList
                                                                }
                                                            })
                                                        }else{
                                                            dispatch({
                                                                type: Constants.ERROR,
                                                                payload: {
                                                                    error: true,
                                                                    message:"Something went wrong"
                                                                }
                                                            });
                                                        }
                                                        if(responseTwo.data.boardInfo){
                                                            dispatch({
                                                                type: Constants.BOARD_INFO,
                                                                payload: {
                                                                    boardInfo: responseTwo.data.boardInfo
                                                                }
                                                            })
                                                        }
                                                        else{
                                                            dispatch({
                                                                type: Constants.ERROR,
                                                                payload: {
                                                                    error: true,
                                                                    message:"Something went wrong"
                                                                }
                                                            });
                                                        }
                                                        
                                                        dispatch({
                                                            type: Constants.USER_INFO,
                                                            payload: {
                                                                loggedIn: true,
                                                                userInfo: userResponse.data.user
                                                            }
                                                        })
                                                        dispatch({
                                                            type: Constants.SIGN_IN,
                                                            payload: {
                                                                error:true,
                                                                message: "Successful Sign-in",
                                                                loggedIn: true,
                                                            }
                                                        })

                                                      }))
                                                        .catch(errors => {
                                                            dispatch({
                                                                type: Constants.ERROR,
                                                                payload: {
                                                                    error: true,
                                                                    message:"Something went wrong"
                                                                }
                                                            });
                                                        })
                                                }
                                                else{
                                                    axios
                                                    .get('/user', {
                                                        params:{
                                                            id
                                                        }
                                                    })
                                                        .then(boardListResponse => {
                                                            if (boardListResponse.data.boardList) {
                                                                dispatch({
                                                                    type: Constants.USER_INFO,
                                                                    payload: {
                                                                        loggedIn: true,
                                                                        userInfo: userResponse.data.user
                                                                    }
                                                                })
                                                                dispatch({
                                                                    type: Constants.USER_BOARDS,
                                                                    payload: {
                                                                        boardList: boardListResponse.data.boardList
                                                                    }
                                                                })
                                                                dispatch({
                                                                    type: Constants.SIGN_IN,
                                                                    payload: {
                                                                        error: false,
                                                                        message:"Successful Sign-in",
                                                                        loggedIn: true,
                                                                    }
                                                                })
                                                            } 
                                                            else {
                                                                dispatch({
                                                                    type: Constants.ERROR,
                                                                    payload: {
                                                                        error: true,
                                                                        message:"Something went wrong"
                                                                    }
                                                                });
                                                            }
                                                        })
                                                }
                                            } 
                                            else {
                                                    dispatch({
                                                        type: Constants.USER_INFO,
                                                        payload: {
                                                            userInfo: null
                                                        }
                                                    })
                                            }
                                        })
                                            .catch(error => {
                                                dispatch({
                                                    type: Constants.ERROR,
                                                    payload: {
                                                                error: true,
                                                                message:"Something went Wrong"
                                                            }
                                                })
                                            })
                                                   
                            }
                            else{
                                dispatch({
                                            type: Constants.ERROR,
                                            payload: {
                                                error: true,
                                                message:"Something went wrong"
                                            }
                                })
                            }
                        })
                            .catch(error => {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        error: true,
                                        message:"Email-id or Password is wrong"
                                    }
                                })
                            })
    }
}

const signOutReq=(history)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .post("/auth/signOut")
                        .then((response)=>{
                            if (response.status === 200) {
                                dispatch({
                                    type: Constants.SIGN_OUT,
                                    payload: {
                                        message:"Successful Sign-out",
                                        loggedIn: false,
                                        // set up component did mount in the logout component with a getUserInfo dispatch
                                    }
                                })
                                history.push("/logout");
                            }
                            else{
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Sign-out Error"
                                    }
                                })
                            }
                        })
                            .catch(error => {
                                dispatch({
                                    type: Constants.ERROR,
                                    payload: {
                                        message:"Sign-out Error"
                                    }
                                })
                            })
    }
}

const getUserInfo=(toggle = false)=>{
    
    return (dispatch, getState) => {

        return  axios
                    .get('/auth/user').then(response => {
                        if (response.data.user) {
                            dispatch({
                                type: Constants.USER_INFO,
                                payload: {
                                    loggedIn: true,
                                    userInfo: response.data.user,
                                    message: {show:false, msg:{}}
                                }
                            })
                            if(toggle){
                                toggleDrawer("left", false);
                            }
                        } 
                        else {
                            console.log("err")
                            dispatch({
                                type: Constants.USER_INFO,
                                payload: {
                                    userInfo: null
                                }
                            })
                        }
                    })
    }
}

const toggleShow=()=>{

    return (dispatch, getState) =>{
        dispatch({
            type: Constants.TOGGLE_SHOW,
            payload: {show:false, msg:{}}
        })
    }
}

export {signUpReq, signInReq, signOutReq, getUserInfo, toggleShow};