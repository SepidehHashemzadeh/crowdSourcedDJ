import React from 'react';
import Search from './Search.jsx';
import CreateEventForm from './CreateEventForm.jsx';
import EventPageLeader from './EventPageLeader.jsx';
require("../resources/css/dashboard.css");

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div>
				<div id="searchAndAdd">
					<Search />
					<CreateEventForm user={this.props.user}/>
				</div>
				<div id="eventPage">
					<EventPageLeader />
				</div>
			</div>
		);
	}
}

export default Dashboard;