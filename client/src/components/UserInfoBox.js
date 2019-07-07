import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class UserInfoBox extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Welcome!</h1>
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

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    username: state.getSignin
  }
};
//connects store actions and states to component
export default connect(mapStateToProps)(UserInfoBox);
