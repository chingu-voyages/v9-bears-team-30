import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export class UserInfoBox extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.user);
  }

  render() {
    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Welcome!</h1>
        </div>
        <div className='signup-form'>
          <div className='user-input-container'>
            <p className='signup-success-message' style={{textAlign:'center', lineHeight:'24px', marginRight:'5%'}}>Thank you for signing in {this.props.user}</p>
          </div>
        </div>
      </div>
    )
  }
}