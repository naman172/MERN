import React from 'react';
import {Icon} from 'semantic-ui-react'


import '../css/NoBoards.css'
const NoBoardsToDisplay = ()=>{
    return (
        <div className="body">
            <div className="overlayBox">
                <div className="text">
                    It seems like you haven't created any boards yet.
                    <br></br>
                    <div className="subtext">
                        ( Click on <Icon name="add"></Icon>Add new board to continue )
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default NoBoardsToDisplay;