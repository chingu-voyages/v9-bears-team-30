import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSignupEmail } from '../../actions/changeSignupEmailAction';
import { changeSignupPassword } from '../../actions/changeSignupPasswordAction';
import { putSignup } from '../../actions/putSignupAction';
import './signup.css';

export class SignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailEmptyError: false,
      passwordEmptyError: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.signupMaker = this.signupMaker.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
  }

  //whenever user changes email input, calls action to update store
  handleEmailChange(event) {
    this.props.changeSignupEmail(event.target.value);
  }

  //whenever user changes password input, calls action to update store
  handlePasswordChange(event) {
    this.props.changeSignupPassword(event.target.value);
  }

  //when signup is clicked, we send email and password as object to put function
  handleClick() {
    //call checkEmpty to check for empty email/pw
    this.checkEmpty();
    //only send post request if forms aren't empty
    if (this.props.signupEmail && this.props.signupPassword) {
      this.props.putSignup(this.signupMaker());
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

  //check if either field is empty on submit, update error message via state if so
  checkEmpty() {
    if (!this.props.signupEmail) {
      this.setState({
        emailEmptyError: true
      });
    } else {
      this.setState({
        emailEmptyError: false
      });
    }

    if (!this.props.signupPassword) {
      this.setState({
        passwordEmptyError: true
      });
    } else {
      this.setState({
        passwordEmptyError: false
      });
    }
  }

  render() {

    //make either a button that says "Sign Up" or "Loading..."
    let button;

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
      <div className='signup-page' onClick={this.handleChange}>
        <div className='signup-container'>
          <div className='signup-heading-container'>
            <h1 className='signup-heading-h1'>Join ClimateSpy today, it&apos;s Free.</h1>
          </div>
          <div className='signup-form'>
            <div className='user-input-container'>
              <input className='signup-input' type='text' placeholder="Email" value={this.props.signupEmail} onChange={this.handleEmailChange}/>
              {this.state.emailEmptyError &&
                <span>email can't be empty</span>
              }
              <input className='signup-input' type='text' placeholder="Password" value={this.props.signupPassword} onChange={this.handlePasswordChange}/>              
              {this.state.passwordEmptyError &&
                <span>pw can't be empty</span>
              }
              { button }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    signupEmail: state.signupEmail.signupEmail,
    signupPassword: state.signupPassword.signupPassword,
    saving: state.putSignup.saving
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
