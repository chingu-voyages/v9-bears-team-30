import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/getSigninAction';
import { UserInfoBox } from '../UserInfoBox';
import { SearchHistory } from '../SearchHistory';
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
    return (
      <Layout>
        <div className="signup-page dashboard-page" style={{marginTop:80}}>
          <UserInfoBox
            user={this.props.auth}
          />
          <SearchHistory
            history={this.props.history}
          />
        </div>
      </Layout>
    )
  }
}

//pass store state as props. value must equal a valid store key. 
const mapStateToProps = ( state ) => {   
  return { 
    auth: state.getSignin,
    history: state.searchHistory
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
