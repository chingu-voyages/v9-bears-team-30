import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  //renders search history array as paragraph elements or "no search histroy" if no searches
  render() {
    //make separate var for prop
    let userHistory=this.props.history;

    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History</h1>
          {userHistory < 1 ? <p>No search history</p> : userHistory.map((item, i) => 
            <p style={{lineHeight:'24px'}} key={item + i}>
              {item}
            </p>
          )}
        </div>
      </div>
    )
  }
}

