import React, {useState} from 'react';
import {connect} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import styles from "../css/sidebar.module.css";
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import {Icon} from 'semantic-ui-react';

import AddButton from "./AddButton.js";

import {changeBoard} from '../actions/index'

const useStyles = makeStyles({
  paper: {
    background: "#1e2022",
    opacity: 0.975,
    border: 0,
    color: 'white',
    padding: "8px",
    width:"259px",
  }
});

var toggleDrawer = (side, open) => {
  setter({ ...SideBar.state, [side]: open });
} 

var setter;

//Component body
function SideBar({boards = [], dispatch, id, boardOnDisplay}){

  const classes = useStyles();

  const [state, setState] = useState(
    {
      left: false,
      right: false,
    }
  )

  setter = setState;
  
  function handleClick(e){
    let inUse = e.currentTarget.getAttribute("data-condition")
    if(inUse === 'false'){
      dispatch(changeBoard(id,e.currentTarget.getAttribute("data-id"), boardOnDisplay));
    }
  }
  

  var sideList = () => {

    var boardList= boards.map((board)=>
    {
      let opacity=board.inUse?"0.3":"1";
      let cursor=board.inUse?"default":"pointer";
      return ( 
        <div data-id={board._id} data-condition={board.inUse} onClick={board.inUse?()=>{}:handleClick} key={board._id} className={styles.boardCard}>
              <div className={styles.general} style={{cursor}}>
                  <div style={{display: "flex", paddingLeft: "10px"}}>
                    <Typography style={{alignSelf: "center", fontSize: "1.1em", opacity}}>
                      {board.title}
                    </Typography>
                  </div>
                  <div style={{height:"100%"}}>
                    {board.users.length>1?<button className={styles.boardButton} style={{cursor}}><Icon name="group" size="large"/></button>:""}
                    <button className={board.inUse?styles.boardButton:styles.boardButtonZ} style={{cursor}}><Icon name="cogs" size="large"/></button>
                  </div>
              </div>
                
        </div>)
    })

    return (
    <div style={{width:"100%", height:"100%"}}>
       <div style={{height:"10%"}}></div>
       <hr className={styles.hrStyle}/>
       <div className={styles.boardList}>{boardList}</div>
       <hr className={styles.hrStyle}/>
      <AddButton board ="true"/>
    </div>)

    };

  return (
      <div>
          <Drawer className={styles.overlay} classes={{paper : classes.paper}} open={state.left} onClose={()=>{toggleDrawer('left', false)}}>
            {sideList()}
          </Drawer> 
      </div>
    );
}

const mapStateToProps=(state)=>{
    if(state.boardDetails && state.authDetails.userInfo){
      return {
        id : state.authDetails.userInfo._id,
        boards : state.boardDetails.boardList,
        boardOnDisplay: state.authDetails.userInfo.boardOnDisplay
      }
    }
    else{
      return {
        id : '',
        boards : [],
        boardOnDisplay:''
      }

    }
}

export {toggleDrawer};
export default connect(mapStateToProps)(SideBar);