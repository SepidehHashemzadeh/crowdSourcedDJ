import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
require("./../resources/css/createEventForm.css");

var CreateEventForm = React.createClass({
	getInitialState: function () {
		/*this.toggle = this.toggle.bind(this);
		this.toggleNested = this.toggleNested.bind(this);*/

		return { 
			eventName: null,
			eventLocation: null,
			eventStartTime: null,
			eventDescription: null,
			creatingForm: false,
			isNameValid: false,
			submitDisabled: true,
			modal: false,
			nestedModal: false
		}
	},

	toggle: function () {
		console.log('toggle');
		this.setState({ modal: !this.state.modal });
	},

	toggleNested: function () {
		this.setState({ nestedModal: !this.state.nestedModal });
	},

	handleEventName: function (e){
		this.setState({ eventName: e.target.value});
	},
	validateForm: function(){
		var allFieldsFilled = (this.state.eventName && this.state.eventStartTime
			    && this.state.eventDescription && this.state.eventLocation);
		var now = new Date().toJSON();
		var startTimeInFuture = (now < this.state.eventStartTime);
		return (allFieldsFilled && startTimeInFuture);
	},
	validateStartTime: function(){
		var now = new Date().toJSON();
		var startTimeInFuture = (now < this.state.eventStartTime);
		return (!this.state.eventStartTime || startTimeInFuture);
	},
	handleEventLocation: function (e){
		this.setState({ eventLocation: e.target.value});
	},
	handleEventStartTime: function(e){
		this.setState({ eventStartTime: e.target.value});
	},
	handleEventDescription: function(e){
		this.setState({ eventDescription: e.target.value});
	},

	createForm: function () {
		this.setState({creatingForm: true});
	},

	submitForm: function () {
		var url = "https://djque.herokuapp.com/?query="; 
		var eventName = this.state.eventName;
		var eventLocation = this.state.eventLocation;
		var eventTime = this.state.eventStartTime;
		eventTime = eventTime.replace('T', ' ');
		eventTime += ':00';
		console.log("timestamp: " + eventTime);
		var eventDescription = this.state.eventDescription;

		var query = "INSERT INTO Events (name, startTime, description, location, userId, isEnded, songAmt) VALUES ('"; 
		query +=  eventName + "', '";
		query += eventTime + "', '" 
		query += eventDescription + "', '" 
		query += eventLocation + "', 1, 0, 0); ";
		var query2 = "INSERT INTO Events (name, startTime, description, location, userId, isEnded, songAmt) VALUES ('lol2', 2, 'description', 'location', 1, 0, 0); "

		console.log(url + query);
		console.log(encodeURI(url + query));

		fetch(encodeURI(url + query)).then((res) => {
			return res.json();
		}).then((res) => {
			console.log(res);
		});

		this.setState({
			eventName: 'hi',
			eventLocation: 'hi',
			eventStartTime: '',
			eventDescription: 'hi',
			creatingForm: false,
			modal: false,
			nestedModal: false
		});
	},

	render: function () {
		return (
			<div id="createEventFormOuterDiv" className="createEventFormButton">
				<Button color="danger" onClick={this.toggle} className="button-create" id="addEventButton">+</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalBody>
						<div>
							<form>
							  <header>
							    <h2 className="formTitle">Create New Event</h2>
							    <div></div>
							  </header>
							  
							  <div>
							    <label>Event Name</label>
							    <div>
							      <input type="text" size="8" 
							             className="createEventFieldInput"
						    			 onChange={this.handleEventName}
							             value={this.state.eventName}
							             maxLength="255"/>
							    </div>
							  </div>
							    

							  <div>
							    <label>
							    	Event Time
							    </label>
							    <div>
							    <input type="datetime-local"
						    		    className="createEventFieldInput"
						         	    onChange={this.handleEventStartTime}
						    		    value={this.state.eventStartTime}/>
							    </div>
							  </div>


							  <div>
							    <label>
							      Location
							    </label>
							    <div>
							      <input type="text" maxLength="255"
							             className="createEventFieldInput"
						    			 onChange={this.handleEventLocation}
						    		     value={this.state.eventLocation}/> 
							   	</div>
							  </div>
							    
							  <div>
							    <label>
							      Event Description
							    </label>
							  
							    <div>
							      <textarea rows="5"
							               className="createEventFieldInput"
						    			   onChange={this.handleEventDescription}
						    		       value={this.state.eventDescription}></textarea>
							    </div>
							  </div>
							    { this.validateForm() ? 
								    	null
							    	: 
							    		<div><div>Please fill out all required fields.</div></div> }
						    	<div>
						    		{this.validateStartTime() ? null : 
						    			<div>Please select an Event Time in the future.</div>}
						    	</div>
							</form>
						</div>
            			<br />
          			</ModalBody>
          			<ModalFooter>
            			<Button disabled={!this.validateForm()} color="primary" onClick={this.toggleNested}>Submit</Button>
           				<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
              				<ModalHeader>Nested Modal title</ModalHeader>
              				<ModalBody>Stuff and things</ModalBody>
              				<ModalFooter>
                				<Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                				<Button color="secondary" onClick={this.toggle}>All Done</Button>
              				</ModalFooter>
            			</Modal>{' '}
            			<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          			</ModalFooter>
        		</Modal>
			</div>
		);
	}
});

export default CreateEventForm; 

