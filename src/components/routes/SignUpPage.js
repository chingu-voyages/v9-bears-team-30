import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSignupEmail } from '../../actions/changeSignupEmailAction';
import { changeSignupPassword } from '../../actions/changeSignupPasswordAction';
import { putSignup } from '../../actions/putSignupAction';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SignupSuccess } from '../SignupSuccess';
import { NavLink } from "react-router-dom";

export class SignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      passwordTooShortError: false,
      passwordInvalidError: false,
      emailInvalidError: false,
      emailTakenError: true
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.signupMaker = this.signupMaker.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  //whenever user changes email input, removes error messages and calls action to update store
  handleEmailChange(event) {
    this.resetErrors();
    this.props.changeSignupEmail(event.target.value);
  }

  //whenever user changes password input, removes error messages and calls action to update store
  handlePasswordChange(event) {    
    this.resetErrors();
    this.props.changeSignupPassword(event.target.value);
  }

  //when signup is clicked, we send email and password as object to put function (redux)
  handleClick() {
    //only send post request if no pre-post errors
    if (!this.checkErrors()) {
      this.props.putSignup(this.signupMaker());
      this.setState({
        emailTakenError: true
      })
    }
  }

  //combine email and password into a single signup object to send to db
  signupMaker() {
    var newSignup =  {
      signupEmail: this.props.signupEmail,
      signupPassword: this.props.signupPassword
    }
    return newSignup;
  }

  //check for empty fields, too short pw, invalid pw
  checkErrors() {
    let passwordRegex = RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");
    let emailRegex = /\S+@\S+\.\S+/;
    let weHaveErrors=false;

    if (this.props.signupPassword.length<6) {
      this.setState({
        passwordTooShortError: true
      });
      weHaveErrors=true;
    }

    if (!passwordRegex.test(this.props.signupPassword)) {
      this.setState({
        passwordInvalidError: true
      });
      weHaveErrors=true;
    }

    if (!emailRegex.test(this.props.signupEmail)) {
      this.setState({
        emailInvalidError: true
      });
      weHaveErrors=true;
    }

    return weHaveErrors;
  }

  //resets error message, called from onChange functions
  resetErrors() {    
    //reset and remove email error message on typing
    if (this.state.emailEmptyError || this.state.passwordEmptyError || this.state.passwordTooShortError || this.state.passwordInvalidError || this.state.emailInvalidError || this.props.error) {
      this.setState({
        passwordTooShortError: false,
        passwordInvalidError: false,
        emailInvalidError: false,
        emailTakenError: false
      });
    }
  }

  render() {

    //make either a button that says "Sign Up" or "Loading..."
    let button;
    let inputErrorClass = this.state.passwordTooShortError || this.state.passwordInvalidError || this.state.emailInvalidError || this.props.error ? 'signup-input-error' : null;
    let emailError;

    //shows email taken error when we have that error, we're not awaiting a post request, and we're not typing
    if (this.state.emailTakenError && this.props.error && !this.props.saving) {
      emailError=true;
    } else if (!this.state.emailTakenError && this.props.error) {
      emailError=false;
    }

    if (this.props.saving) {
      button = (
        <button className='signup-button'>
          Loading...
        </button>
      );
    } else {
      button = (
        <button className='signup-button' onClick={this.handleClick}>
          Sign Up
        </button>
      );
    }    

    return (
      <div className='signup-page'>
        {this.props.success.length == 0 ? (
          <div className='signup-container'>
            <div className='signup-heading-container'>
              <h1 className='signup-heading-h1'>Join ClimateSpy today, it&apos;s Free.</h1>
            </div>
            <div className='signup-form'>
              <div className='user-input-container'>
                <input className={'signup-input ' + inputErrorClass} type='text' placeholder="Email" value={this.props.signupEmail} onChange={this.handleEmailChange}/>       
                {this.state.emailInvalidError &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>Use a valid email address</span>
                  </div>
                }
                {emailError &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>Email address already taken</span>
                  </div>
                }
                <input className={'signup-input ' + inputErrorClass} type='text' placeholder="Password" value={this.props.signupPassword} onChange={this.handlePasswordChange}/>
                {this.state.passwordInvalidError &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>Use at least one number, letter, and special symbol</span>
                  </div>
                }
                {this.state.passwordTooShortError &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>Use 6 or more characters</span>
                  </div>
                }
                { button }
                <div className='signup-signin-link-container'>
                  <span className='signup-signin-link-text'>
                    Already a member? 
                    <NavLink to="/signin" className="signup-signin-link">
                      <span> Sign in</span>
                    </NavLink>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SignupSuccess/>
        )}
        
      </div>
    )
  }
}

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    signupEmail: state.signupEmail.signupEmail,
    signupPassword: state.signupPassword.signupPassword,
    saving: state.putSignup.saving,
    success: state.putSignup.newSignup,
    error: state.putSignup.error
  }
};

//passes actions as props. dispatch(callback()) must equal an imported action name
const mapDispatchToProps = (dispatch) => {
  return {
    changeSignupEmail: (signupEmail) => {
      dispatch(changeSignupEmail(signupEmail))
    },
    changeSignupPassword: (signupPassword) => {
      dispatch(changeSignupPassword(signupPassword))
    },
    putSignup: (emailAndPassword) => {
      dispatch(putSignup(emailAndPassword))
    }
  }
};

//connects store actions and states to component
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
