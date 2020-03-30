import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from '../css/card.module.css'
import {Draggable} from 'react-beautiful-dnd';
// import styled from "styled-components";

// const StyledCard = styled.div`
// transform: ${props => props.drag?"rotate(5deg)":null};
// `

const ListCard = ({text, cardId, index}) => {
    return (
      <Draggable draggableId={cardId} index={index} >
        {
          (provided, snapshot) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className = {styles.base}>
              {/* <StyledCard drag={snapshot.isDragging}> */}
              <Card>
                <CardContent className={styles.override}>
                  <Typography>
                    {text}
                  </Typography>
                </CardContent>
                </Card>
              {/* </StyledCard> */}
            </div>
          )
        }
      </Draggable>  
  );
}

export default ListCard
