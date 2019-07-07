import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class SearchHistory extends Component {

  constructor(props) {
    super(props);    
  }

  componentWillMount() {
    console.log(this.props.history.searchHistory);
  }

  render() {
    return (
      <div className='signup-container dashboard'>
        <div className='signup-heading-container'>
          <h1 className='signup-heading-h1'>Search History</h1>
          {JSON.stringify(this.props.history.searchHistory)}
        </div>
      </div>
    )
  }
}

