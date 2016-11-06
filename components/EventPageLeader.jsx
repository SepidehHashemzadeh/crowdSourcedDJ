import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
require("./../resources/css/eventPage.css");

class EventPageLeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
			eventID: 30
		};
		this.render = this.render.bind(this);
	}
	componentDidMount() {
		var url = "https://djque.herokuapp.com/?query="; 

		var eventQuery = "SELECT * FROM Events WHERE id="+ this.state.eventID + ";";
		console.log(encodeURI(url + eventQuery));
		fetch(encodeURI(url + eventQuery)).then((res) => {
			return res.json();
		}).then((res) => {
			console.log(res);
			console.log(res[0]);
			this.setState({
				eventName: res[0].name,
				eventLocation: res[0].location,
				eventStartTime: res[0].startTime,
				eventDescription: res[0].description
			});
		});
	}

	render() {
		return (
			<div id="eventPageLeader">
				<h2 className="eventName">{this.state.eventName}</h2>
				<p className="eventLocationTime">{this.state.eventLocation} at {this.state.eventStartTime}</p>
				<p>description: {this.state.eventDescription}!!!!</p>
				<hr/>
				<div id="addSong">
					<p>Add Song to Queue Here!</p>
				</div>
				<hr/>
				<div id="queue">
					<p>Display Widgets Here!</p>
				</div>
			</div>
		);
	}
}

export default EventPageLeader; 