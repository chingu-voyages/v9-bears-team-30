import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/getSigninAction';
import './signup.css';
import Layout from "../layouts/layout";

export class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  //when button is clicked, sends action to react store
  handleClick(e) {
    console.log('logging out...');
    this.props.logoutUser();
  }

  render() {

    const { user } = this.props.auth;
    console.log(this.props.auth);

    return (
      <Layout>
        <div style={{marginTop:100}}>
          Welcome {user.toString()}
          <button onClick={this.handleClick}>
            Logout
          </button>
        </div>
      </Layout>
    )
  }
}

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    auth: state.getSignin
  }
};

//passes actions as props. dispatch(callback()) must equal an imported action name
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
};

//connects store actions and states to component
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
