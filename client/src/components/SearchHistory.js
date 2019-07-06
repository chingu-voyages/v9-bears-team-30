import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import './routs/signup.css';

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History!</h1>
        </div>
        <div className='signup-form'>
          <div className='user-input-container'>
            <p className='signup-success-message' style={{textAlign:'center', lineHeight:'24px', marginRight:'5%'}}>Thank you for signing in!</p>
          </div>
        </div>
      </div>
    )
  }
}
