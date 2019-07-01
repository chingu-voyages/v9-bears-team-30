import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import './routs/signup.css';

export class SigninSuccess extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    setTimeout(function(){ window.location.replace("http://localhost:8080/dashboard"); }, 5000);
  }

  render() {



    return (
      <div className='signup-container'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Success!</h1>
        </div>
        <div className='signup-form'>
          <div className='user-input-container'>
            <p className='signup-success-message' style={{textAlign:'center', lineHeight:'24px', marginRight:'5%'}}>Thank you for signing in! You will be redirected to the&nbsp;
            <Link
              to="/dashboard"
              style={{ color: `white`, textDecoration: 'none'}}
            >
              <span className="link-text">Dashboard</span>
            </Link>
            &nbsp;in 5 seconds...</p>
          </div>
        </div>
      </div>
    )
  }
}
