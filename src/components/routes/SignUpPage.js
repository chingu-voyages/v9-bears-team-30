import React, { Component } from 'react';

export class SignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      myState: 'my value'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      myState: 'new state'
    });
  }

  render() {
    return (
      <div onClick={this.handleChange}>

      </div>
    )
  }
}