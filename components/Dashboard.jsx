import React from 'react';
import Search from './Search.jsx';
import CreateEventForm from './CreateEventForm.jsx';
require("../resources/css/dashboard.css");

class Dashboard extends React.Component {
	render () {
		return (
			<div id="searchAndAdd">
				<Search />
				<CreateEventForm />
			</div>
		);
	}
}

export default Dashboard;