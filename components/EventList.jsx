import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
import EventListItem from './EventListItem.jsx';
import { getUserInfo } from '../databaseShortcuts.js';
var url = 'https://djque.herokuapp.com/?query=';
require("../resources/css/eventList.css");

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userInfo: [] };
		this.getEventList = this.getEventList.bind(this);
	}
	getEventList() {
		var arr = [];
		let key=0;
		this.props.eventList.map((item) => {
			var user = getUserInfo(item.userId);
			key++;
			arr.push(
				<EventListItem name={this.props.name} eventInfo={item} key={key} userInfo={user} />
			);
		});
		return arr;
	}
	render() {
		return(
			<div id={this.props.name+"EventListItemOuterDiv"}>
			    <ul>
					{this.getEventList()}
				</ul>
		    </div>
		);
	}
}

export default EventList;