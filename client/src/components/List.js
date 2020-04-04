import React, {useState} from "react";
import { connect } from "react-redux";
import styles from '../css/list.module.css';
import AddButton from './AddButton.js';
import { Droppable, Draggable } from "react-beautiful-dnd";
import {Popup, Button, Icon} from "semantic-ui-react";
import InnerList from './InnerList.js'
import {editList, deleteList} from '../actions/index';
import '../css/list.css'

const List = ({title, cards, listId, index, boardId, dispatch}) => {

    const [state, setState]= useState({
        text:"",
        isOpen:false
    })

    const trashList = ()=>{ 
        dispatch(deleteList(listId, boardId))
    }

    const editTitle = ()=>{
        let {text} = state;
        if(text){
            if(text.trim()){
                dispatch(editList(listId, text, boardId));
            }
        }
        setState(()=>{
            return {
                text:""
            }
        })
    }

    const handleInput = (e)=>{
        setState({
            text: e.target.value
        })
    }
    
    return (
        <Draggable draggableId={listId} index={index}>
            {
                (provided)=>(
                    <div {...provided.draggableProps} ref={provided.innerRef} className={styles.box}>
                    <div className = {styles.base} {...provided.dragHandleProps}> 
                    <Droppable droppableId={listId}>
                        {
                            (provided)=>(
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                   <div className={styles.listHeader}>
                                        <h4 className={styles.title}>{title}</h4>
                                        <div style={{display: "inline-block"}}>
                                            <Popup
                                                trigger={
                                                    <button className={styles.icon}><Icon style={{cursor:"pointer"}} name="edit"/></button>
                                                }
                                                content={
                                                    <div>
                                                        <input type="search" placeholder={title} className={styles.formSearchBox} autoFocus onChange={handleInput}/>
                                                        <Button color="green" content='Edit' className={styles.edit} onMouseDown={editTitle}/>
                                                    </div>
                                                    }
                                                on='click'
                                                
                                                position='bottom center'
                                            />
                                            <Popup
                                                style={{overflow:"visible"}}
                                                trigger={
                                                    <button className={styles.icon}>
                                                        <Icon style={{cursor:"pointer", marginRight: "3px"}} name="trash alternate"/>
                                                    </button>            
                                                }
                                                content={
                                                    <div>
                                                        <div style={{textAlign:"center", marginBottom:"8px"}}>
                                                            Are you sure that you want to delete this list?
                                                        </div>
                                                        <Button color='red' content='Confirm' className={styles.edit} onClick={trashList} />
                                                    </div>
                                                    }
                                                on='click'
                                                position='bottom center'
                                            />
                                        </div>
                                   </div>
                                    <InnerList listItems = {cards} itemType="card" listId={listId}/>
                                    {provided.placeholder}
                                    <AddButton className={styles.positionPersitence} listId={listId} />
                                </div>
                            )
                        }
                    </Droppable>
                    </div>
                    </div>
                )
            }
        </Draggable>
    )
}

const mapStateToProps = (state)=>{
    if(state.authDetails.userInfo){
        return {
          boardId : state.authDetails.userInfo.boardOnDisplay
        }
      }
      else{
        return {
          boardId : ""
        }
      }
}

export default connect(mapStateToProps)(List);

