import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
//redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index.js';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
//component
let data = JSON.parse(document.querySelector('#dataObject').text);

ReactDOM.render(
    <Provider store={store}>
        <Main data={data}/>
    </Provider>
    , document.getElementById('app'));
