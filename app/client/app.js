import React, { Component, PropTypes } from 'react';
import Main from './Main.jsx'
let data = JSON.parse(document.querySelector('#dataObject').text);
React.render(<Main  data={data}/>, document.getElementById('app'));
