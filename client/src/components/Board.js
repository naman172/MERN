import React from "react";
import AddButton from './AddButton.js';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';

import InnerList from './InnerList.js';

import {reorderList, reorderCard, persistUpdate} from '../actions/index.js';

import styles from '../css/board.module.css';

const Board = ({dispatch, boardId, lists}) => {

    const onDragEnd = result => {
      const {destination, source, draggableId, type} = result;
    
      if(!destination || ((destination.droppableId === source.droppableId) && (destination.index === source.index))){
        return;
      }
    
      else {
        if(type === 'list'){
          dispatch(reorderList(destination.index, draggableId, boardId));
                }
        else{
          dispatch(reorderCard(source.droppableId, destination.droppableId, destination.index, draggableId, boardId));
        }
        dispatch(persistUpdate(source.droppableId, source.index, destination.droppableId, destination.index, type));
      }
    }
    
    return( 
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" direction="horizontal" type="list">
          {
            (provided)=>(
              <div {...provided.droppableProps} ref={provided.innerRef} className = {styles.listContainer}>
                  <InnerList itemType='list' listItems={lists} />
                  {provided.placeholder}
                  <AddButton list="true" />
              </div>
            )
          }
        </Droppable>
      </DragDropContext> 
    );
}

const mapStateToProps = (state) => {
  let boardId, lists;

  if(state.authDetails.userInfo){
    boardId = state.authDetails.userInfo.boardOnDisplay
  }
  else{
    boardId = ""
  }
  
  if(state.boardDetails.boardInfo){
    lists = state.boardDetails.boardInfo.lists
  }
  else{
    lists = []
  }

  return {
    boardId,
    lists
  }
}

export default connect(mapStateToProps)(Board);