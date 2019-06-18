import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSigninEmail } from '../../actions/changeSigninEmailAction';
import { changeSigninPassword } from '../../actions/changeSigninPasswordAction';
import { getSignin } from '../../actions/getSigninAction';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SigninSuccess } from '../SigninSuccess';
import { NavLink } from "react-router-dom"

export class SignInPage extends Component {

  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.signinMaker = this.signinMaker.bind(this);
  }

  //whenever user changes email input, calls action to update store
  handleEmailChange(event) {
    this.props.changeSigninEmail(event.target.value);
  }

  //whenever user changes password input, calls action to update store
  handlePasswordChange(event) {
    this.props.changeSigninPassword(event.target.value);
  }

  //when signin is clicked, we send email and password as object to get function (redux)
  handleClick() {
    this.props.getSignin(this.signinMaker());
  }

  //combine email and password into a single signin object to send to db
  signinMaker() {
    var newSignin =  {
      signinEmail: this.props.signinEmail,
      signinPassword: this.props.signinPassword
    }
    return newSignin;
  }

  render() {

    //make either a button that says "Sign Up" or "Loading..."
    let button;
    let inputErrorClass = this.props.error;

    if (this.props.saving) {
      button = (
        <button className='signup-button'>
          Loading...
        </button>
      );
    } else {
      button = (
        <button className='signup-button' onClick={this.handleClick}>
          Sign In
        </button>
      );
    }    

    return (
      <div className='signup-page signin-page'>
        {this.props.success.length == 0 ? (
          <div className='signup-container'>
            <div className='signup-heading-container'>
              <h1 className='signup-heading-h1'>Log In</h1>
            </div>
            <div className='signup-form'>
              <div className='user-input-container'>
                <input className='signup-input' type='text' placeholder="Email" value={this.props.signinEmail} onChange={this.handleEmailChange}/>
                <input className={'signup-input ' + inputErrorClass} type='text' placeholder="Password" value={this.props.signinPassword} onChange={this.handlePasswordChange}/>
                {this.props.error &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>The username or password did not match. Please try again.</span>
                  </div>
                }
                { button }
                <div className='signup-signin-link-container'>
                  <span className='signup-signin-link-text'>
                    New to ClimateSpy? 
                    <NavLink to="/signup" className="signup-signin-link">
                      <span> Create an account.</span>
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SigninSuccess/>
        )}
        
      </div>
    )
  }
}

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    signinEmail: state.signinEmail.signinEmail,
    signinPassword: state.signinPassword.signinPassword,
    saving: state.getSignin.saving,
    success: state.getSignin.newSignin,
    error: state.getSignin.error
  }
};

//passes actions as props. dispatch(callback()) must equal an imported action name
const mapDispatchToProps = (dispatch) => {
  return {
    changeSigninEmail: (signinEmail) => {
      dispatch(changeSigninEmail(signinEmail))
    },
    changeSigninPassword: (signinPassword) => {
      dispatch(changeSigninPassword(signinPassword))
    },
    getSignin: (emailAndPassword) => {
      dispatch(getSignin(emailAndPassword))
    }
  }
};

//connects store actions and states to component
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
