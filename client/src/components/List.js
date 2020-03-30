import React from "react";
import styles from '../css/list.module.css';
import AddButton from './AddButton.js';
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from './InnerList.js'

const List = ({title, cards, listId, index}) => {
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
                                    <h4 className={styles.title}>{title}</h4>
                                    <InnerList listItems = {cards} itemType="card"/>
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

export default List;

