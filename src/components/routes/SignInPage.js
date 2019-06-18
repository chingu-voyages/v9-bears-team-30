import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSigninEmail } from '../../actions/changeSigninEmailAction';
import { changeSigninPassword } from '../../actions/changeSigninPasswordAction';
import { getSignin } from '../../actions/getSigninAction';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SigninSuccess } from '../SigninSuccess';

export class SignInPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      invalidEmailOrPassword: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.signinMaker = this.signinMaker.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  //whenever user changes email inget, removes error messages and calls action to update store
  handleEmailChange(event) {
    this.resetErrors();
    this.props.changeSigninEmail(event.target.value);
  }

  //whenever user changes password inget, removes error messages and calls action to update store
  handlePasswordChange(event) {    
    this.resetErrors();
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

  //resets error message, called from onChange functions to remove  error message on typing
  resetErrors() {
    if (this.state.invalidEmailOrPassword) {
      this.setState({
        invalidEmailOrPassword: false
      });
    }
  }

  render() {

    //make either a button that says "Sign Up" or "Loading..."
    let button;
    let ingetErrorClass = this.state.invalidEmailOrPassword;

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
      <div className='signup-page'>
        {this.props.success.length == 0 ? (
          <div className='signup-container'>
            <div className='signup-heading-container'>
              <h1 className='signup-heading-h1'>Log In</h1>
            </div>
            <div className='signup-form'>
              <div className='user-inget-container'>
                <inget className='signup-inget' type='text' placeholder="Email" value={this.props.signinEmail} onChange={this.handleEmailChange}/>
                <inget className={'signup-inget ' + ingetErrorClass} type='text' placeholder="Password" value={this.props.signinPassword} onChange={this.handlePasswordChange}/>
                {this.state.invalidEmailOrPassword &&
                  <div className='signup-error-message-container'>
                    <FontAwesomeIcon className='signup-error-icon' icon={faExclamationCircle} size='1x' transform='shrink-1' color='#fe0c0b'/>
                    <span className='signup-error-message'>The username or password did not match. Please try again.</span>
                  </div>
                }
                { button }
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
