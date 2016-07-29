require('./App.scss');
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index.js';
import Firebase from 'firebase';

export class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this._appActions = bindActionCreators(actions, props.dispatch);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (e)=> {
      var ENTER = 13;
      if( e.keyCode == ENTER ) {
        this.submitLink();
      }
    }, false);


    this._appActions.fetchData();
  }

  submitLink () {
    let{url, name} = this.refs;


    let data = {
      url: url.value,
      name : name.value,
      created_at: new Date().getDate()
    };


    if(data.url.length > 0 && data.name.length > 0) {
      this._appActions.pushData(data);
    } else {
      console.error('Error, please provide a url and title');
    }
  }

  handleRemoveLink(key) {
    this._appActions.removeLink(key);
  }

  getMoreData() {
    this._appActions.fetchData(10);
  }

  render() {

    let {data, links, results, } = this.props;

    var resultsMessage ='';
    if(results && results.url) {
      resultsMessage = `Pushed ${results.url}`;
    }

    var items;
    if(links) {
      items = Object.keys(links).reverse().map((object, i) => {
        var url = links[object].url;
        var title = links[object].title;

        return (
          <li key={object} className="links__list--item">
            <a href={url}>{title}</a>
            {data.admin ? <span onClick={this.handleRemoveLink.bind(this, object)} className="links__close">X</span> : <span></span> }
          </li>);
        });
      }

      return (
        <div>
          <div className="links_form">
            <input className="form__controls" type="text" name="name" placeholder="Name" ref="name"></input>
            <input className="form__controls" type="url" name="url" placeholder="URL" ref="url"></input>
            <button onClick={this.submitLink.bind(this)} className="links___button">Submit</button>
          </div>
          <div className="links__main">

            <div>{resultsMessage}</div>

            <ul className="links__list">
              {items}
            </ul>
          </div>
        </div>
      );
    };
  }

  function mapStateToProps(state) {
    // console.log('state', state)
    return {
      links: state.links,
      results: state.dataPushedResults
    };
  }


  export default (typeof document !== "undefined" ?
  connect(
    mapStateToProps
  )(Main) : Main);
