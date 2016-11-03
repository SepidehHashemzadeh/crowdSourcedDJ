import React from 'react';
import Search from './Search.jsx';
import AddEvent from './AddEvent.jsx';
require("../resources/css/dashboard.css");

class Dashboard extends React.Component {
	render () {
		return (
			<div id="searchAndAdd">
				<Search />
				<AddEvent />
			</div>
		);
	}
}

export default Dashboard;