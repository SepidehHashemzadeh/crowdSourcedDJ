import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatabaseHelper from '../databaseShortcuts.js';

class SearchListItem extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			modal: false
		};

		this.createRequest = this.createRequest.bind(this);
		this.toggle = this.toggle.bind(this);
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
			return(
				<li className="eventSearchLoadingItem">
					<div className="eventSearchLoadingDiv hvr-back-pulse2">
						<p>{this.props.eventInfo.name}</p>

							<button className="button-create btn btn-danger" onClick={this.createRequest}>Join</button>
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
	}
	}

	render() {
		return (this.getEventDiv());
	}

	createRequest() {

		var fromId = this.props.user.id;
		var toId = this.props.eventInfo.userId;
		var eventId = this.props.eventInfo.id;

		var query = "INSERT INTO Invites (fromId, toId, isRequest, eventId, isPending) VALUES ('";
		query +=  fromId + "', '";
		query += toId + "', '";
		query += "1" + "', '";
		query += eventId + "', '";
		query += "1'); ";

		DatabaseHelper(query).then((res) => {
			//console.log(res);
		});

		this.toggle();
	}

}

export default SearchListItem;