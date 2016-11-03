import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import EventPage from './components/EventPage.jsx';

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<EventPage />, document.getElementById('eventPage'));
