import React from "react";
import {connect} from "react-redux";
import styles from '../css/card.module.css'
import {Draggable} from 'react-beautiful-dnd';
import { Icon } from "semantic-ui-react";
import { deleteCard } from "../actions";

const ListCard = ({text, cardId, listId, index, dispatch, boardId}) => {
    
      const trashCard = ()=>{
        dispatch(deleteCard(cardId, listId, boardId));
      }

      return (
      <Draggable draggableId={cardId} index={index} >
        {
          (provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className = {styles.base}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  {text}
                </div>
                <button className={styles.trash}>
                  <Icon style={{cursor:"pointer"}} onClick={trashCard} name="trash alternate"/>
                </button>
              </div>
            </div>
          )
        }
      </Draggable>  
  );
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

export default connect(mapStateToProps)(ListCard)
