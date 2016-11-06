import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
require("./../resources/css/createEventForm.css");

class EventPageLeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
			eventID: null
		};
		this.render = this.render.bind(this);
	}

	render() {
		return (
			<div className="eventPageLeader">
				<p>EVENT PAGE!!!!</p>
			</div>
		);
	}
}

export default EventPageLeader; 