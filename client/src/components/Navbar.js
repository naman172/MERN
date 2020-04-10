import React, {useState} from "react";
import {connect} from 'react-redux'
import {Popup, Icon, Card, Button, Label} from 'semantic-ui-react';
import FlashMessage from 'react-flash-message' 

import '../css/navbar.css'
import styles from "../css/navbar.module.css";
import SvgIcon from '@material-ui/core/SvgIcon';

import {toggleDrawer} from "./Sidebar.js"


import {signOutReq, collabAccept, collabReject, getCollabs, syncUp, changeBoard, toggleSend, toggleShow} from "../actions/index";

const Navbar = ({title, buttons, dispatch, history, collabs, userId, boardOnDisplay}) => {
    
    const [state, setState] = useState(
        {
          accept: false
        }
      )

    const accept=(id,boardId)=>{
        dispatch(collabAccept(id, boardId))
        setState({
            accept:true
        });
    }
    const reject=(id,boardId)=>{
        dispatch(collabReject(id, boardId))
    }

    const sync = (boardId)=>{
        dispatch(getCollabs(userId, boardId))
    }

    const handleSync = ()=>{
        dispatch(syncUp(userId, boardOnDisplay))
    }

    const home=()=>{
        dispatch(changeBoard(userId, "", boardOnDisplay));
    }

    const handleBoards = ()=>{
        toggleDrawer("left", true)
        toggleSend()
        toggleShow()
    } 

    return(
    <div className={styles.container}>
        <div className={styles.background}>
            <div>
            {
                buttons?(
                    <button className={styles.boards} onClick={handleBoards}>
                    <SvgIcon style={{alignSelf: "center", marginRight : "4px"}}>
                        <path fill="currentColor" d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" />
                    </SvgIcon>
                    <div style={{alignSelf: "center"}}>Boards</div>
                </button>
                ):""
            }
            </div>
            <div className={styles.title}><img className={styles.icon} src="./dashboard.ico" style={{zIndex:'1'}} alt="dasboard icon"/>{title}</div> 
            <div style={{justifySelf: "end"}}>
            {
                buttons?(
                    <div style={{display:"flex"}}>
                        <button onClick={home} className={styles.home}>
                            <Icon name="home" style={{background: "transparent"}} size="large"/>
                        </button>
                        <button onClick={handleSync} className={styles.syncUp}>
                            <Icon name="sync" size="large"/>
                        </button>
                        <Popup
                            trigger={
                                <button className={styles.bell}>
                                    <Icon name="bell outline" size="large"></Icon>
                                    {collabs.length?<Label color='red' style={{    position: "absolute", top: "8px", right: "118px", fontSize:"xx-small"}}>{collabs.length}</Label>:""}
                                </button>
                            }
                            content={
                                <div className={styles.userList}>
                                    {collabs.length?(collabs.map((request, index)=>(
                                        <Card key={index}>
                                            <Card.Content>
                                                <Card.Header>{request.username}</Card.Header>
                                                <Card.Meta>{request.email}</Card.Meta>
                                                <Card.Description>
                                                {request.username} wants to collaborate with you on <strong>{request.title}</strong> board.
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                <Button onClick={()=>{accept(userId, request.boardId)}} basic color="green" style={{color:"rgba(90,172,68,1)"}}>
                                                    Accept
                                                </Button>
                                                <Button onClick={()=>{reject(userId, request.boardId)}} basic color='red'>
                                                    Decline
                                                </Button>
                                                </div>
                                            </Card.Content>
                                        </Card>
                                    ))):
                                    (<div className={styles.req}>
                                        No Requests
                                    </div>)}
                                    <Button color="yellow" onClick={sync} style={{marginRight:"0"}}><Icon name="sync" size="large"></Icon>Sync Requests</Button> 
                                </div>
                                }
                            on='click'
                            position="bottom right"
                            className={styles.pop}
                        />
                        <button className={styles.logout} onClick={()=>{dispatch(signOutReq(history))}}>
                            <div style={{alignSelf: "center"}}><Icon name="sign-out alternate" size="large"/>Logout</div>
                        </button>
                    </div>
                    ):""
            }
            </div>
            {state.accept?( 
                <FlashMessage duration={3000} onShow={()=>{setState({accept:!state.accept})}} style={{position:"absolute", zIndex:"100"}} >
                    <div className={styles.flashContainer}>
                        <div className={styles.flash}>    
                            Collaboration request accepted. This board has been added to your list. 
                        </div>
                    </div>
                </FlashMessage>):""}
        </div>
    </div>
    );
}

const mapStateToProps =(state)=>{
    if(state.collabs && state.authDetails.userInfo && state.boardDetails.boardInfo){
        return{
            collabs: state.collabs.users,
            userId: state.authDetails.userInfo._id,
            boardOnDisplay: state.boardDetails.boardInfo._id
        }
    }
    else{
        return{
            collabs: [],
            userId:"",
            boardOnDisplay:""
        }
    }
}

export default connect(mapStateToProps)(Navbar);