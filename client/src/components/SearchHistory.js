import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  //renders search history array as paragraph elements or "no search histroy" if no searches
  render() {
    //update search history
    let userHistory=this.props.history[this.props.history.length-1];
    console.log(this.props.history);

    return (
      <div className='signup-container dashboard' style={{marginBottom:20}}>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History</h1>
          <div className='search-history-container' style={{paddingBottom:40, width:'90%', textAlign:'center'}}>
            {!userHistory ? <p>No search history</p> : userHistory.map((item, i) => 
              <p style={{marginLeft:0, lineHeight:'24px'}} key={item + i}>
                {item}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}