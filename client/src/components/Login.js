import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from "./Navbar";
import {connect} from 'react-redux';
import {signUpReq, signInReq} from "../actions/index"

import '../css/Login.css';


class Login extends Component {

  state ={
    overlayPositionLeft : true,
    username:"",
    email:"",
    password:""
  }

  overlayStyle =  "";
  overlayInnerStyle = "";
  handleClick = () => {
    this.setState({
      overlayPositionLeft: !this.state.overlayPositionLeft
    })
    this.overlayStyle=this.state.overlayPositionLeft?"overlay-moveHalfRight":"overlay-moveHalfLeft";
    this.overlayInnerStyle=this.state.overlayPositionLeft?"overlayInner-moveHalfLeft":"overlayInner-moveHalfRight";
  }

  handleInput = (e)=>{
    let type = e.target.getAttribute('type');
    if(type === "text"){
      this.setState({
        username: e.target.value
      })
    }
    else if(type === "email"){
      this.setState({
        email: e.target.value
      })
    }
    else if(type === "password"){
      this.setState({
        password: e.target.value
      })
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    if(e.target.getAttribute("data") === 'signin'){
      let email = this.state.email;
      let password = this.state.password;
      this.props.dispatch(signInReq(email, password));
    }
    else{
      let username = this.state.username;
      let email = this.state.email;
      let password = this.state.password;
      this.props.dispatch(signUpReq(username, email, password));
    }

    this.setState({
      username: '',
      email: '',
      password:''
    })
  }

  render(){
    if(this.props.loggedIn){
      return <Redirect to="/home" />
    } 
    else {
      return (
        <div className="pageContainer">
          <div className="nav">
            <Navbar title="trello"/>
          </div>
          <section>
          <div className="auth">
              <div id="formBox">
                <div id="overlay" className={this.overlayStyle}>
                  <div id="overlayInner" className={this.overlayInnerStyle}>
                    <div id="signUp">
                      <div className="content">
                        <h1>Welcome Back!</h1>
                        <p>Continue on with your work by loggin in with your email id.</p>
                        <button onClick={this.handleClick}>Sign In</button>
                      </div>
                    </div>
                    <div id="signIn">
                      <div className="content">
                        <h1>Hey!</h1>
                        <p>Enter your personal details and start your journey with us today.</p>
                        <button onClick={this.handleClick}>Sign Up</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="forms">
                  <div id="signInForm" className={this.state.overlayPositionLeft?"shiftRight":""}>
                    <div className="holder">
                      <h1>Sign in</h1>
                      <form data="signin" onSubmit={this.handleSubmit}>
                        <input type="email" required placeholder="Email" value={this.state.email} onChange={this.handleInput}/><br/>
                        <input type="password" required placeholder='Password' value={this.state.password} onChange={this.handleInput}/>
                        <p>Forgot your password?</p>
                        <button>Sign In</button>
                      </form>
                      <div className="divider">
                        <div className="divider1"></div>
                        <div className="divider2">
                          or
                        </div>
                        <div className="divider1"></div>
                      </div>
                      <button className="social">
                        <i className="fab fa-facebook-f facebook"></i>
                        <span>Continue with Facebook</span>
                      </button>
                    </div>
                  </div>
                  <div id="signUpForm" className={this.state.overlayPositionLeft?"":"shiftLeft"}>
                    <div className="holder">
                      <h1>Create Account</h1>
                      <form data='signup' onSubmit={this.handleSubmit}>
                        <input type="text" required placeholder="Username" value={this.state.username} onChange={this.handleInput}/><br/>
                        <input type="email" required placeholder="Email" value={this.state.email} onChange={this.handleInput}/><br/>
                        <input type="password" required placeholder='Password' value={this.state.password} onChange={this.handleInput}/>
                        <button>Sign Up</button>
                      </form>
                      <div className="divider">
                        <div className="divider1"></div>
                        <div className="divider2">
                          or
                        </div>
                        <div className="divider1"></div>
                      </div>
                      <button className="social">
                        <i className="fab fa-facebook-f facebook"></i>
                        <span>Continue with Facebook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    loggedIn: state.authDetails.loggedIn,
  }
}

export default connect(mapStateToProps)(Login);
