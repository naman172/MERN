import React, {useState} from 'react';
import {connect} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import styles from "../css/sidebar.module.css";
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import {Icon, Card, Feed} from 'semantic-ui-react';

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
function SideBar({boards = [], dispatch, id, boardOnDisplay, logs = []}){

  const classes = useStyles();

  const [state, setState] = useState(
    {
      left: false,
      displayLog: false
    }
  )

  setter = setState;
  
  function handleClick(e){
    let inUse = e.currentTarget.getAttribute("data-condition")
    if(inUse === 'false'){
      dispatch(changeBoard(id,e.currentTarget.getAttribute("data-id"), boardOnDisplay));
    }
  }
  
  var handleLog=()=>{
    setter({...state,
        displayLog:!state.displayLog
      })
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

    let iconVal = (action)=>{

      switch(action){
        case "add": return "add"
        case "delete": return "trash alternate"
        case "collabPlus": return "add user"
        case "edit": return "edit"
        case "collabMinus": return "remove user" 
        case "reorder": return "shuffle"
        default: return ""
      }
    }

    var logList = logs.slice().reverse().map((log)=>
                  (<Feed.Event>
                    <Feed.Label ><Icon name={iconVal(log.action)} style={{marginTop:"4px", color:"white", marginLeft:"4px"}}/></Feed.Label>
                    <Feed.Content style={{padding: "0"}}>
                      <Feed.Date content={log.timeStamp} style={{color: "rgba(255,255,255,0.4)"}} />
                      <Feed.Summary style={{color:"rgb(255,255,255)", fontWeight: "400"}}>
                        {log.text}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>)
                )

    return (
    <div style={{width:"100%", height:"100%"}}>
        <div style={{height:"10%", display:"flex"}}>
          <button disabled={boardOnDisplay===""} className={boardOnDisplay===""?styles.disabled:styles.containerBoard} onClick={handleLog}>
              <Icon style={{paddingRight:"6px", paddingLeft:"8px", color:"white", opacity:"0.8"}} name="history" size="large"/>
              <p style={{marginLeft:"20px"}}>Board history</p>
          </button>
        </div>
        <hr className={styles.hrStyle}/>
        {state.displayLog?
        (<div style={{height:"88.97%", overflowY:"auto"}}>
          <Card style={{background:"transparent", width: "220px"}}>
           <Card.Content>
             <Feed>{logList}</Feed>
           </Card.Content> 
          </Card>
        </div>):(<div style={{height: "88.97%"}}>
          <div style={{height:"77%"}} className={styles.boardList}>{boardList}</div><hr className={styles.hrStyle}/><AddButton board ="true"/>
        </div>)
        }
    </div>)

    };

  return (
      <div>
          <Drawer className={styles.overlay} classes={{paper : classes.paper}} open={state.left} onClose={()=>{
            toggleDrawer('left', false);
          }}>
            {sideList()}
          </Drawer> 
      </div>
    );
}

const mapStateToProps=(state)=>{
    if(state.boardDetails.boardInfo && state.authDetails.userInfo && state.boardDetails){
      return {
        id : state.authDetails.userInfo._id,
        boards : state.boardDetails.boardList,
        boardOnDisplay: state.authDetails.userInfo.boardOnDisplay,
        logs : state.boardDetails.boardInfo.opLog
      }
    }
    else{
      return {
        id : '',
        boards : [],
        boardOnDisplay:'',
        logs:[]
      }

    }
}

export {toggleDrawer};
export default connect(mapStateToProps)(SideBar);