import React, {Component} from "react";
import styles from "../css/boardBar.module.css";
import { Icon, Popup, Button, Input } from 'semantic-ui-react';
import {connect} from 'react-redux';
import FlashMessage from 'react-flash-message' 


import '../css/boardBar.css'
import { deleteBoard, editBoard, sendCollabRequest, toggleSend, deleteCollab } from "../actions/index.js";
class BoardBar extends Component{
    
    state = {
        text : "",
        collabForm : false,
        editForm: false,
        isOpen:false,
    }   

    trashBoard = ()=>{
        this.props.dispatch(deleteBoard(this.props.boardId, this.props.owner.id))
        this.handleOpen();
    }

    handleOpen=()=>{
        this.setState((prevState)=>{
            return {
                isOpen:!prevState.isOpen
            }
        })
    } 

    editTitle = ()=>{
        let {text} = this.state;
        
        if(text){
            if(text.trim()){
                this.props.dispatch(editBoard(this.props.boardId, text, this.props.owner));
            }
        }

        this.setState(()=>{
            return {
                text:""
            }
        })
    }

    sendCollab = ()=>{
        let {text} = this.state;
        if(text){
            if(text.trim()){
                this.props.dispatch(sendCollabRequest(this.props.boardId, this.props.title, this.props.username, this.props.email, text));
                this.props.dispatch(toggleSend())
                this.setState(()=>{
                    return {
                        text:"",
                    }
                })
            }
        }
    }

    handleInput = (e)=>{
        this.setState({
            text: e.target.value
        })
    }

    toggleCollabForm = ()=>{
        this.setState((prevState)=>(
            {
                collabForm:!prevState.collabForm
            }
        ))
    }
    toggleEditForm = ()=>{
        this.setState((prevState)=>(
            {
                editForm:!prevState.editForm
            }
        ))
    }

    handleDeleteCollab = (email)=>{
        this.props.dispatch(deleteCollab(email, this.props.boardId, this.props.id))
    }

    render(){
        return (
            <div>
                <div className={styles.container}>
                    {this.props.users?(<div className={styles.content}>
                        <div className={styles.title}>{this.props.title}</div>
                        <Popup
                            trigger={
                                <button disabled={(this.props.users.length>1)?false:true} className={styles.mainButton}><Icon name="group" size="large"/></button>
                            }
                            content={
                                <div className={styles.userList}>
                                    {this.props.users.map((user, index)=>(
                                        <div  className={styles.card} key={index}>
                                            <div>
                                                <div className={styles.header}>
                                                    {user.username}
                                                </div>
                                                <div className={styles.sub}>
                                                    {user.email} 
                                                </div>
                                            </div>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                {
                                                    (this.props.owner.id===this.props.id)?
                                                    ((this.props.owner.email===user.email)?"":<Icon onClick={()=>(this.handleDeleteCollab(user.email))} className="trashU" name="trash alternate" size="large"></Icon>):
                                                    ((this.props.owner.email===user.email)?<Icon style={{opacity:"0.3"}} name="star" size="large"></Icon>:"")
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                }
                            on='click'
                            position='bottom center'
                        />
                         {this.state.editForm?(
                            <div style={{display:"inline-block"}} onBlur={this.toggleEditForm}>
                            <Input type='text' placeholder={this.props.title} autoFocus onChange={this.handleInput} action>
                                <input />
                                <Button onMouseDown={this.editTitle}>Edit</Button>
                            </Input>
                            </div>
                            ):
                            (<button className={styles.mainButton} onClick={this.toggleEditForm}><Icon name="edit" size="large"/></button>)}
                       
                        <Popup
                            trigger={
                                <button disabled={this.props.owner.id!==this.props.id} className={styles.mainButton}><Icon name="trash alternate" size="large"/></button>
                            }
                            content={
                                <div>
                                    <div style={{textAlign:"center", marginBottom:"8px"}}>
                                        Are you sure that you want to delete this board?
                                    </div>
                                    <Button color='red' content='Confirm' autoFocus className={styles.trash} onMouseDown={this.trashBoard} />
                                </div>
                                }
                            on='click'
                            open={this.state.isOpen}
                            onOpen={this.handleOpen}
                            onBlur={this.handleOpen}
                            position='bottom center'
                            style={{overflow:"visible"}}
                        />
                        {this.state.collabForm?(
                            <div style={{display:"inline-block"}} onBlur={this.toggleCollabForm}>
                            <Input type='text' placeholder='Email' autoFocus onChange={this.handleInput} action>
                                <input />
                                <Button onMouseDown={this.sendCollab}>Send Request</Button>
                            </Input>
                            </div>
                        ):(<button className={styles.mainButton} onClick={this.toggleCollabForm}><Icon name="add user" size="large"/></button>)}
                       
                    </div>):""}
                </div>
                {console.log(this.props.send.show)}
                {(this.props.send.show?( 
                <FlashMessage duration={3000} style={{position:"absolute", zIndex:"100"}} >
                    <div className="flashContainer">
                        <div className="flash" style={this.props.send.msg.error?{background: "linear-gradient(45deg, crimson 30%, white 130%)"}:{background: "linear-gradient(45deg, rgba(90,172,68,1) 75%, white 110%)"}}>    
                            {this.props.send.msg.message}
                        </div>
                    </div>
                </FlashMessage>):"")}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if(state.boardDetails.boardInfo){
        return {
            boardId : state.boardDetails.boardInfo._id,
            title: state.boardDetails.boardInfo.title,
            users: state.boardDetails.boardInfo.users,
            owner: state.boardDetails.boardInfo.owner,
            username: state.authDetails.userInfo.username,
            id: state.authDetails.userInfo._id,
            boardList: state.boardDetails.boardList,
            email: state.authDetails.userInfo.email,
            send: state.collabs.send
        }
    }
    else{
        return ({
            id: "",
            title:"",
            users:[],
            owner:"",
            boardId:"",
            boardList:[],
            email:"",
            username:"",
            send:{}
        })
    }    
}

export default connect(mapStateToProps)(BoardBar)