import React, {useState} from 'react';
import {connect} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import styles from "../css/sidebar.module.css";
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';

import AddButton from "./AddButton.js";

import {changeBoard} from '../actions/index'

const useStyles = makeStyles({
  paper: {
    background: "black",
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
function SideBar({boards = [], dispatch}){

  const classes = useStyles();

  const [state, setState] = useState(
    {
      left: false,
      right: false,
    }
  )

  setter = setState;

  function handleClick(e){
    dispatch(changeBoard(e.currentTarget.getAttribute("data-id")));
  }
  
  var sideList = (side) => {

    var boardList= boards.map((board)=>(
    <div data-id={board._id} onClick={handleClick} key={board._id} className={styles.boardCard}>
          <Typography style={{alignSelf: "center"}}>
            {board.title}
          </Typography>
    </div>)
    )

    return (<div style={{width:"100%", height:"100%"}}>
       <div style={{height:"10%"}}></div>
       <hr className={styles.hrStyle}/>
       <div className={styles.boardList}>{boardList}</div>
       <hr className={styles.hrStyle}/>
      <AddButton board ="true" />
    </div>)

    };

  return (
      <div>
          <Drawer className={styles.overlay} classes={{paper : classes.paper}} open={state.left} onClose={()=>{toggleDrawer('left', false)}}>
            {sideList('left')}
          </Drawer> 
          <Drawer anchor="right" open={state.right} onClose={()=>{toggleDrawer('right', false)}}>
            {sideList('right')}
          </Drawer>
      </div>
    );
}

const mapStateToProps=(state)=>{
    if(state.authDetails.userInfo){
      return {
        boards : state.boardDetails.boardList
      }
    }
}

export {toggleDrawer};
export default connect(mapStateToProps)(SideBar);