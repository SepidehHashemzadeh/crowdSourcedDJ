import React from 'react';
import Search from './Search.jsx';
import CreateEventForm from './CreateEventForm.jsx';
require("../resources/css/dashboard.css");

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="searchAndAdd">
				<Search />
				<CreateEventForm user={this.props.user}/>
			</div>
		);
	}
}

export default Dashboard;