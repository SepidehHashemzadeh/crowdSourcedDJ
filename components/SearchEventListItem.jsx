import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatabaseHelper from '../databaseShortcuts.js';
require("./../resources/css/searchEvent.css");
class SearchEventListItem extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			modal: false
		};

		this.createRequest = this.createRequest.bind(this);
		this.toggle = this.toggle.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.checkIfRequested = this.checkIfRequested.bind(this);
		this.getEventDiv = this.getEventDiv.bind(this);
	}

	toggle() {
		this.setState({ modal: !this.state.modal });
	}

	getEventDiv() {
		if(typeof this.props.eventInfo === "undefined")
		{
			return (<li>
								<div>
								</div>
							</li>
			);
		}
		else {
			if(!this.checkIfRequested()) {
				return(
					<li className="eventSearchLoadingItem">
						<div className="eventSearchLoadingDiv hvr-back-pulse2">
							<p>{this.props.eventInfo.name}</p>
							<p>{this.formatTime(this.props.eventInfo.startTime)}</p>
							<span className="button-create btn btn-danger joinEventButton" onClick={this.createRequest}>Join</span>
								 <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					      	    	<ModalHeader>
					      	    		Success!
					      	    	</ModalHeader>
					         	 	<ModalBody>
					         	 		Your request to join has been sent to the Event Leader.
					          		</ModalBody>
					        	  	<ModalFooter>
					            		<Button color="primary" onClick={this.toggle}>Done</Button>
					          		</ModalFooter>
					        	</Modal>
						</div>
					</li>
				);
			} else {
				return (
					<li className="eventSearchLoadingItem">
						<div className="eventSearchLoadingDiv hvr-back-pulse2">
							<p>{this.props.eventInfo.name}</p>
							<p>{this.formatTime(this.props.eventInfo.startTime)}</p>
						</div>
					</li>
				);
			}
		}
	}

	render() {
		return (this.getEventDiv());
	}

	createRequest() {

		var fromId = this.props.user.id;
		var toId = this.props.eventInfo.userId;
		var eventId = this.props.eventInfo.id;

		console.log(this.props.eventInfo);

		var query = "INSERT INTO Invites (fromId, toId, isAccepted, eventId, isPending) VALUES ('";
		query +=  fromId + "', '";
		query += toId + "', '";
		query += "0" + "', '";
		query += eventId + "', '";
		query += "1'); ";

		DatabaseHelper(query).then((res) => {
			//console.log(res);
		});

		this.toggle();
	}

	formatTime(startTime) {
		var t = this.props.eventInfo.startTime;
		if(~this.props.eventInfo.startTime.indexOf("T")) {
			var d1 = this.props.eventInfo.startTime.split("T");
			var d2 = d1[0].split("-")
			var formatedDate = d2[1]+'/'+d2[2]+'/'+d2[0]
			return " – " + formatedDate;
		} else {
			return ""
		}
	}

	checkIfRequested() {
		if(this.props.invites.length > 0) {
			for(var i = 0; i < this.props.invites.length; i++) {
				if(this.props.invites[i].eventId == this.props.eventInfo.id ) {
					return true
				}
			}
		}
		return false
	}
}

export default SearchEventListItem;