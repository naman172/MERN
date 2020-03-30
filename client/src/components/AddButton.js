import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import styles from '../css/addButton.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import {connect} from 'react-redux';
import { addBoard, addList, addCard} from '../actions/index.js';
 

class AddButton extends Component{

    state = {
        form : false,
        text : ""
    }

    toggleForm = ()=>{
        this.setState((prevState)=>{
            return {
                form : !prevState.form
            }
        })
    }

    renderAddButton(){
        const {list, board} = this.props;
        const addButtonText = list ? "Add another list" : (board?"Add another board":"Add another card");
        const color = (list || board) ? "white" : "inherit";
        const opacity = (list || board) ? 1 : 0.8;
        const backgroundColor = list ? "rgba(256,256,256,0.125)" : "inherit";

        return (
            <div style = {{color, opacity, backgroundColor}} className={ list ? styles.containerList:null} onClick={this.toggleForm}> 
                <div className = {!list?(board?styles.containerBoard:styles.containerCard): styles.containerListDisplay}>
                    <i style={{paddingRight:"6px", paddingLeft:"8px"}} className="fas fa-plus"></i>
                    <p>{addButtonText}</p>
                </div>
                {board?(<div className={styles.containerBoard}></div>):null}
            </div>
        )
    }

    handleInput = (e)=>{
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = ()=>{
        const {dispatch, boardOnDisplay} = this.props;
        let {text} = this.state;
        if(text.trim()){
            this.setState({
                text:""
            });
            dispatch(addList(boardOnDisplay, text));
        }
    }

    handleAddCard = ()=>{
        const {dispatch, listId, boardOnDisplay} = this.props;
        let {text} = this.state;
        if(text.trim()){
            this.setState({
                text:""
            });
            dispatch(addCard(boardOnDisplay, listId, text));
        }

        return;
    }

    handleAddBoard = ()=>{
        const {dispatch, userId} = this.props;
        let title = this.state.text;
        if(title.trim()){
            this.setState({
                text: ""
            });
            dispatch(addBoard(userId, title))
        }
    }

    renderForm(){

        const {list, board} = this.props;

        const placeholderText = list ? 'Enter list title' : (board?"Enter board title":"Enter a title for this card");
        const buttonText = list ? 'Add List' : (board?"Add Board":"Add Card");

        return ( board?(<div>
                <input type="search" placeholder={placeholderText} className={styles.formSearchBox} autoFocus onBlur={this.toggleForm} onChange={this.handleInput}/>
                    <div className={styles.formAddContainer}>
                        <button className={styles.formAddButton} onMouseDown={this.handleAddBoard}> {buttonText} </button>
                        <i className="fas fa-times" style = {{color:"rgba(0, 0, 0, 0.6)", cursor:"pointer"}} onMouseDown={this.toggleForm}></i>
                    </div>
            </div>):(
            <div className= {list ? styles.formBox : null}>
            <Card className ={styles.formCard} style = {list? {border: "2px solid rgba(90,172,68,1)"} : null }>
                <TextareaAutosize className = {styles.formTextarea} placeholder = {placeholderText} autoFocus onBlur={this.toggleForm} onChange={this.handleInput} />
            </Card>
            <div className={styles.formAddContainer}>
                <button className={styles.formAddButton} onMouseDown={list?this.handleAddList:this.handleAddCard}> {buttonText} </button>
                <i className="fas fa-times" style = {{color:"rgba(0, 0, 0, 0.6)", cursor:"pointer"}} onMouseDown={this.toggleForm}></i>
            </div>
        </div>
        )
        )
    }
    
    render(){
        return (<div>
            {this.state.form ? this.renderForm() : this.renderAddButton()}
        </div>)
    }    
}


const mapStateToProps = (state) => {
    if(state.authDetails.userInfo){
        return {
            userId: state.authDetails.userInfo._id,
            boardOnDisplay: state.authDetails.userInfo.boardOnDisplay
        }
    }
    else{
        return ({
            userId: "",
            boardOnDisplay: ""
        })
    }    
}

export default connect(mapStateToProps)(AddButton);