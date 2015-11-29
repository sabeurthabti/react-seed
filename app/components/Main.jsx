require('./App.scss');
import React, { Component, PropTypes } from 'react'
import {xhrP} from '../utils/xhr.js'
export default class Main extends Component {

  async componentDidMount() {

    var results = await xhrP('get', 'http://localhost:3000/data', true);
    console.log(results)
  }

  render() {

    let{data} = this.props;
    return (

      <h1>Hello {data.name} was 2016</h1>)
      }
    }
