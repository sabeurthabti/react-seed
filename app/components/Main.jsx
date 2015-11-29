require('./App.scss');
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index.js';

class Main extends Component {

    constructor(props, context) {
        super(props, context);
        this._appActions = bindActionCreators(actions, props.dispatch);
    }


    componentDidMount() {

       this._appActions.fetchData();
    }

    render() {

        const appActions = this._appActions;

        let {data, links} = this.props;
        console.log('sab')

        return (

            <h1>Hello {data.name} was 2016</h1>)
    }
}

function mapStateToProps(state) {
    return {
        look: state.look,
        links: state.links
    };
}


export default (typeof document !== "undefined" ?
    connect(
        mapStateToProps
    )(Main) : Main);
