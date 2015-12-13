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
    this._appActions.fetchData();
  }

  submitLink () {
    let{url, name} = this.refs;

    let data = {
      url: url.value,
      name : name.value,
      created_at: new Date().getDate()
     }

      this._appActions.pushData(data);
    }

    handleRemoveLink(key) {
      this._appActions.removeLink(key);
    }

    render() {

      let {data, links, results} = this.props;

      var resultsMessage ='';
      if(results && results.url) {
        resultsMessage = `Pushed ${results.url}`;
      }

      var items;
      if(links) {
        items = Object.keys(links).reverse().map((object, i) => {
          var url = links[object].url;
          var title = links[object].title;
          return <li key={object}> <a href={url}>{title}</a> <span onClick={this.handleRemoveLink.bind(this, object)}>X</span></li>;
          });
        }

        return (
          <div>
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
