require('./App.scss');
import React, { Component, PropTypes } from 'react'

export default class Main extends Component {

  render() {

    let{data} = this.props;

    return (

      <h1>Hello 22 {data.name} was here 2015</h1>)
  }
}
