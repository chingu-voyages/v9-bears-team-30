import React, { Component } from 'react';
//import './routs/signup.css';

export class SignupSuccess extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='signup-container'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Success!</h1>
        </div>
        <div className='signup-form'>
          <div className='user-input-container'>
            <p className='signup-success-message'>Thank you for joining ClimateSpy!</p>
            <a href="">Go back</a>
          </div>
        </div>
      </div>
    )
  }
}
