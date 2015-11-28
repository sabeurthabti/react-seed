require('./App.scss');
import React, { Component, PropTypes } from 'react'

export default class Main extends Component {

  render() {

console.log("sabeur")
debugger;
    let{data} = this.props;

    return (

      <h1>Hello 22 {data.name} was 2016</h1>)
  }
}
