import React, {Component} from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router'

import Navbar from './Navbar.js';
import Board from './Board.js';
import SideBar from './Sidebar.js'
import BoardBar from './BoardBar.js'
import {BoardInfo, NavInfo, BoardMenuInfo} from './Homepage.js'

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
                <div className={styles.body} style={this.props.boardOnDisplay?{}:{overflow:"auto"}}>
                    <Navbar className={styles.nav} title={'Scenario'} history={this.props.history} buttons/>
                    
                    {this.props.boardOnDisplay ?
                        (
                            <div style={{height:"100%"}}>
                                <BoardBar/>
                                <div className={styles.boardbody}>
                                    <Board id="boardContainer"/>
                                </div>
                            </div>
                        ):
                        (
                            <div style={{display:"flex", height:"fit-content", overflow:"visible"}}>
                               <div className={styles.homepageLR}>
                                   <BoardMenuInfo />
                               </div>
                                <div className={styles.homepageCenter}>
                                    <div className={styles.homeCenterText}>
                                        Hi {this.props.username}, <br/> Ready to get some work done ?
                                    </div>
                                    <BoardInfo className={styles.homeCenter}/>
                                </div>
                                <div className={styles.homepageLR}>
                                    <NavInfo/>
                                </div>
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
    if(state.authDetails.userInfo && state.boardDetails){
        return {
            username:state.authDetails.userInfo.username,
            email:state.authDetails.userInfo.email,
            id : state.authDetails.userInfo._id,
            boardOnDisplay: state.authDetails.userInfo.boardOnDisplay,
            boardList:state.boardDetails.boardList
        }
    }
    else{
        return ({
            username:"",
            email:"",
            id: "",
            boardOnDisplay: null,
            boardList:[]
        })
    }    
}

export default compose(connect(mapStateToProps), withRouter)(Home)