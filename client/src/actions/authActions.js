import api from "../api.js";

import {Constants} from "./index.js";

import {toggleDrawer} from "../components/Sidebar.js";

const signUpReq=(username, email, password)=>{
    
    return (dispatch, getState) => {

        return  api
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
        
        return  api
                    .post('/auth/signIn', {
                        email,
                        password
                    })
                        .then(response => {
                            if (response.status === 200) {
                                api
                                    .get('/auth/user')
                                        .then(userResponse => {
                                            if (userResponse.data.user) {
                                                let id = userResponse.data.user._id;
                                                let boardOnDisplay = userResponse.data.user.boardOnDisplay;
                                                if(boardOnDisplay){
                                                    api.all([
                                                        api.get('/user', {params:{id}}),
                                                        api.get('/boards', {params:{id: boardOnDisplay}})
                                                    ]).then(api.spread((...responses) => {
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
                                                    api
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

const signOutReq = (history) => {
    return (dispatch, getState) => {
        console.log("Sign out request starting..."); // Add this
        
        return api
            .post("/auth/signOut")
            .then((response) => {
                console.log("Sign out response:", response); // Add this
                
                if (response.status === 200) {
                    dispatch({
                        type: Constants.SIGN_OUT,
                        payload: {
                            message: "Successful Sign-out",
                            loggedIn: false,
                        }
                    })
                    history.push("/logout");
                }
                else {
                    dispatch({
                        type: Constants.ERROR,
                        payload: {
                            message: "Sign-out Error"
                        }
                    })
                }
            })
            .catch(error => {
                console.log("Sign out error:", error); // Add this
                dispatch({
                    type: Constants.ERROR,
                    payload: {
                        message: "Sign-out Error"
                    }
                })
            })
    }
}
const getUserInfo=(toggle = false)=>{
    
    return (dispatch, getState) => {

        return  api
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