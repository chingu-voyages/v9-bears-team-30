import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/getSigninAction';
import { saveToUserSearchHistory } from '../../actions/saveSearchHistoryAction';
import { UserInfoBox } from '../UserInfoBox';
import { SearchHistory } from '../SearchHistory';
import './signup.css';
import Layout from "../layouts/layout";

export class Dashboard extends Component {

  componentWillMount() {
    console.log('calling put request ' + this.props.userEmail);
    this.props.saveToUserSearchHistory({searchCity: null, searchState: null}, this.props.userEmail);
  }

  render() {
    return (
      <Layout>
        <div className="signup-page dashboard-page" style={{marginTop:80}}>
          <UserInfoBox
            user={this.props.userEmail}
          />
          <SearchHistory
            history={this.props.history}
          />
        </div>
      </Layout>
    )
  }
}

//pass store state as props. value must equal a valid store key (see rootReducer). 
//history is 
const mapStateToProps = ( state ) => {   
  return { 
    history: state.searchHistory.searchHistory,
    userEmail: state.getSignin.user
  }
};

//passes actions as props. dispatch(callback()) must equal an imported action name
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser())
    },    
    saveToUserSearchHistory: (searchCityAndState, email) => {
      dispatch(saveToUserSearchHistory(searchCityAndState, email))
    }
  }
};

//connects store actions and states to component
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
