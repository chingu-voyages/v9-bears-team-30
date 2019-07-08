import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  componentWillMount() {
    console.log(this.props.history);
  }

  //renders search history array as paragraph elements or "no search histroy" if no searches
  render() {
    //make separate var for prop
    let userHistory=this.props.history[0];

    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History</h1>
          {!userHistory ? <p>No search history</p> : userHistory.map((item, i) => 
            <p style={{lineHeight:'24px'}} key={item + i}>
              {item}
            </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {   
  return { 
    history: state.searchHistory.searchHistory
  }
};

//connects store actions and states to component
export default connect(mapStateToProps)(SearchHistory);