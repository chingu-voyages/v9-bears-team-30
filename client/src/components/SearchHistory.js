import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {   
  return { 
    auth: state.getSignin
  }
};