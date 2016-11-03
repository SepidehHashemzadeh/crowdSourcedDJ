import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Search from './Search.jsx';
import AddEvent from './AddEvent.jsx';

ReactDOM.render(<AddEvent />, document.getElementById('add'));
ReactDOM.render(<Search />, document.getElementById('search'));
//ReactDOM.render(<App />, document.getElementById('app'));