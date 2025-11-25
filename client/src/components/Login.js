import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from "./Navbar";
import {connect} from 'react-redux';
import {signUpReq, signInReq, toggleShow} from "../actions/index"
import FlashMessage from "react-flash-message";

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
        ...this.state,
        username: e.target.value
      })
    }
    else if(type === "email"){
      this.setState({
        ...this.state,
        email: e.target.value
      })
    }
    else if(type === "password"){
      this.setState({
        ...this.state,
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
      this.setState(()=>{
        return {
          username:"",
          email:"",
          password:""
        }
    })
    }
    this.props.dispatch(toggleShow());
  }

  render(){
    if(this.props.loggedIn){
      return <Redirect to="/home" />
    } 
    else {
      return (
        <div className="pageContainer">
         <div className="pageContainer">
            <div className="nav">
              <Navbar title="Scenario"/>
            </div>
            <section>
            <div className="auth">
                <div id="formBox">
                  <div id="overlay" className={this.overlayStyle}>
                    <div id="overlayInner" className={this.overlayInnerStyle}>
                      <div id="signUp">
                        <div className="content">
                          <h1>Welcome Back!</h1>
                          <p className="subTextOverlay">Continue on with your work by loggin in with your email id.</p>
                          <button onClick={this.handleClick}>Sign In</button>
                        </div>
                      </div>
                      <div id="signIn">
                        <div className="content">
                          <h1>Hey!</h1>
                          <p className="subTextOverlay">Enter your personal details and start your journey with us today.</p>
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
                          <p/>
                          <button style={{marginBottom:"50px"}}>Sign In</button>
                        </form>
                        {/* <div className="divider">
                          <div className="divider1"></div>
                          <div className="divider2">
                            or
                          </div>
                          <div className="divider1"></div>
                        </div>
                        <button className="social">
                          <i className="fab fa-facebook-f facebook"></i>
                          <span>Continue with Facebook</span>
                        </button> */}
                      </div>
                    </div>
                    <div id="signUpForm" className={this.state.overlayPositionLeft?"":"shiftLeft"}>
                      <div className="holder">
                        <h1>Create Account</h1>
                        <form data='signup' onSubmit={this.handleSubmit}>
                          <input type="text" required placeholder="Username" value={this.state.username} onChange={this.handleInput}/><br/>
                          <input type="email" required placeholder="Email" value={this.state.email} onChange={this.handleInput}/><br/>
                          <input type="password" required placeholder='Password' value={this.state.password} onChange={this.handleInput}/>
                          <button style={{marginBottom:"50px"}}>Sign Up</button>
                        </form>
                        {/* <div className="divider">
                          <div className="divider1"></div>
                          <div className="divider2">
                            or
                          </div>
                          <div className="divider1"></div>
                        </div>
                        <button className="social">
                          <i className="fab fa-facebook-f facebook"></i>
                          <span>Continue with Facebook</span>
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
            {(this.props.message.show?( 
                <FlashMessage duration={3000} style={{position:"absolute", zIndex:"100"}} >
                    <div className="flashContainer">
                        <div className="flash" style={this.props.message.msg.error?{backgroundImage: "linear-gradient(45deg , #ff0844 0%, #ffb199 100%)"}:{backgroundImage: "linear-gradient(45deg, #9be15d 0%, #00e3ae 100%)"}}>    
                            {this.props.message.msg.message}
                        </div>
                    </div>
                </FlashMessage>):"")}
        </div>
      );
    }
  }
}

const mapStateToProps = (state)=>{
  let message;
  if(state.authDetails.message){
    message= state.authDetails.message
  }
  else{
    message={show:false, msg:{}}
  }
  return {loggedIn: state.authDetails.loggedIn, message}

}

export default connect(mapStateToProps)(Login);
