import React, {Component} from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router'

import Navbar from './Navbar.js';
import Board from './Board.js';
import SideBar from './Sidebar.js'
import NoBoardsToDisplay from './NoBoardsToDisplay.js'
import BoardBar from './BoardBar.js'

import styles from "../css/home.module.css"
import '../css/homeIndex.css'

import {getBoardList, getBoard, getCollabs} from "../actions/index.js"

class Home extends Component{
    
    componentDidMount = () => {
        if(this.props.id){
            this.props.dispatch(getBoardList(this.props.id));
            this.props.dispatch(getCollabs(this.props.id));
            if(this.props.boardOnDisplay){
                this.props.dispatch(getBoard(this.props.boardOnDisplay));
            }
        }
    }
      
    render(){
        return (
            <div className="home">
                <div className={styles.body}>
                    <Navbar className={styles.nav} title={'trello'} history={this.props.history} buttons/>
                    
                    {this.props.boardOnDisplay ?
                        (
                            <div>
                                <BoardBar/>
                                <div className={styles.boardbody}>
                                    <Board id="boardContainer"/>
                                </div>
                            </div>
                        ):
                        (
                            <div style={{display:"flex", height:"100%"}}>
                                <div style={{width:"50%"}}></div>
                                <NoBoardsToDisplay />
                            </div>
                        )
                    } 
                    <SideBar/>
                </div>
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    if(state.authDetails.userInfo){
        return {
            id : state.authDetails.userInfo._id,
            boardOnDisplay: state.authDetails.userInfo.boardOnDisplay
        }
    }
    else{
        return ({
            id: "",
            boardOnDisplay: null
        })
    }    
}

export default compose(connect(mapStateToProps), withRouter)(Home)