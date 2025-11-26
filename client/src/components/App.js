import React,{Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from "../actions/index";

import Login from './Login';
import Home from './Home';
import Logout from "./Logout";
import Landing from './Landing';

import '../css/App.css';


class App extends Component {

  componentDidMount(){
    this.props.dispatch(getUserInfo());
  }

  render(){
    return (
        <div className="container">
            <Switch>
              <Route exact path="/auth">
                <Login />
              </Route>
              <Route exact path="/home">
                {
                  this.props.loggedIn?(<Home/>):(<Redirect to= "/auth" />)
                }
              </Route>
              <Route exact path="/logout">
                <Logout/>
              </Route>
              <Route path="/">
                <Landing/>
              </Route>
            </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    loggedIn: state.authDetails.loggedIn,
  }
}

export default connect(mapStateToProps)(App);
