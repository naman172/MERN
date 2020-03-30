import React from "react";
import {connect} from 'react-redux'

import styles from "../css/navbar.module.css";
import SvgIcon from '@material-ui/core/SvgIcon';

import {toggleDrawer} from "./Sidebar.js"


import {signOutReq} from "../actions/index";

const Navbar = ({title, buttons, dispatch, history}) => {
    
    return(
    <div className={styles.container}>
        <div className={styles.background}>
            <div>
            {
                buttons?(
                    <button className={styles.boards} onClick={()=>(toggleDrawer("left", true))}>
                    <SvgIcon style={{alignSelf: "center", marginRight : "4px"}}>
                        <path fill="currentColor" d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" />
                    </SvgIcon>
                    <div style={{alignSelf: "center"}}>Boards</div>
                </button>
                ):""
            }
            </div>
            <div className={styles.title}>{title}</div> 
            <div style={{justifySelf: "end"}}>
            {
                buttons?(
                    <button className={styles.logout} onClick={()=>{dispatch(signOutReq(history))}}>
                    <div style={{alignSelf: "center"}}>Logout</div>
                    </button>
                    ):""
            }
            </div>
        </div>
    </div>
    );
}

export default connect()(Navbar);