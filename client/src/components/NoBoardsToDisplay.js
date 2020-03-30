import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import '../css/NoBoards.css'
const NoBoardsToDisplay = ()=>{
    return (
        <div className="body">
            <div className="overlayBox">
                <div className="text">
                    It seems like you haven't created any boards to display yet.
                    <br></br>
                    <span className="subtext">
                        (Click on the  
                        <SvgIcon style={{alignSelf: "center", marginRight : "4px", marginLeft: "4px"}}>
                            <path fill="currentColor" d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" />
                        </SvgIcon> 
                        Boards button in the top left to continue)
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NoBoardsToDisplay;