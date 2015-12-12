require('./App.scss');
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index.js';
import Firebase from 'firebase';

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this._appActions = bindActionCreators(actions, props.dispatch);
  }


  componentDidMount() {
    var myFirebaseRef = new Firebase("https://sabeur-links.firebaseio.com/");

    this.setState({
      firebaseRef: myFirebaseRef
    })

    this._appActions.fetchData();

    console.log(myFirebaseRef)

  }

  submitLink () {
    let{url, name} = this.refs;

    let data = {
      url: url.value,
      name : name.value }

      this._appActions.pushData(data);
    }

    render() {

      const appActions = this._appActions;
      let {data, links, results} = this.props;

      console.log(links)
      var resultsMessage ='';
      if(results && results.url) {
        resultsMessage = `Pushed ${results.url}`;
      }


      var items = Object.keys(links).reverse().map((object, i) => {
          var url = links[object].url;
          var title = links[object].title;
          return <li key={object}> <a href={url}>{title}</a></li>;
      });

      return (
        <div>
          <h1>Hello {data.name} was 2016</h1>
          <input type="text" name="name" placeholder="Google website .." ref="name"></input>
          <input type="url" name="url" placeholder="http://..." ref="url"></input>
          <button onClick={this.submitLink.bind(this)}>Submit</button>
          <div>{resultsMessage}</div>


            <ul>
        {items}
    </ul>
        </div>)


      }
    }

    function mapStateToProps(state) {
      console.log('state', state)
      return {
        links: state.links,
        results: state.dataPushedResults
      };
    }


    export default (typeof document !== "undefined" ?
    connect(
      mapStateToProps
    )(Main) : Main);
