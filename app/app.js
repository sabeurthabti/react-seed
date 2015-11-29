import React from 'react';
import ReactDOM from 'react-dom';
//component
import Main from './components/Main.jsx';

let data = JSON.parse(document.querySelector('#dataObject').text);
ReactDOM.render(<Main data={data}/>, document.getElementById('app'));
