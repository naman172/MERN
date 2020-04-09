import React,{Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from "../actions/index";

import Login from './Login';
import Home from './Home'

import '../css/App.css';


class App extends Component {

  componentDidMount(){
    this.props.dispatch(getUserInfo());
  }

  render(){
    return (
      <BrowserRouter>
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
                <div>Logged out</div>
              </Route>
              <Route path="/">
                <div>Landing Page</div>
              </Route>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    loggedIn: state.authDetails.loggedIn,
  }
}

export default connect(mapStateToProps)(App);
