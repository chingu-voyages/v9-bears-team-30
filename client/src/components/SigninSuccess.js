import React, { Component } from 'react';
import { Link, Redirect} from "react-router-dom";
//import './routes/signup.css';

export class SigninSuccess extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      redirect: false
    }
  }

  //waits 5 seconds before redirecting
  componentDidMount() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ redirect: true })
    }, 5000);
  }

  //if user nevigates away from page, stop the timeout
  componentWillUnmount() {   
    clearTimeout(this.state.redirect);
  }

  render() {
    if (this.state.redirect === true) {
        return <Redirect to='/dashboard' />
    }

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
