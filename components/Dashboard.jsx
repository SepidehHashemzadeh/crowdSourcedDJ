import React from 'react';
import Search from './Search.jsx'
import AddEvent from './AddEvent.jsx'

class Dashboard extends React.Component {
	render () {
		return (
			<div>
				<Search />
				<AddEvent />
			</div>
		);
	}
}

export default Dashboard;