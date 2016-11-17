import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
require("./../resources/css/createEventForm.css");

class CreateEventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
			eventLeader: this.props.user,
			isNameValid: false,
			modal: false,
			nestedModal: false
		};
		this.toggle = this.toggle.bind(this);
		this.toggleNested = this.toggleNested.bind(this);
		this.handleEventName = this.handleEventName.bind(this);
		this.validateFields = this.validateFields.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.validateStartTime = this.validateStartTime.bind(this);
		this.handleEventLocation = this.handleEventLocation.bind(this);
		this.handleEventStartTime = this.handleEventStartTime.bind(this);
		this.handleEventDescription = this.handleEventDescription.bind(this);
		this.createForm = this.createForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.render = this.render.bind(this);
	}
	toggle() {
		this.setState({ 
			modal: !this.state.modal
		});
	}
	toggleNested() {
		this.setState({ nestedModal: !this.state.nestedModal });
	}

	handleEventName(e){
		this.setState({ eventName: e.target.value});
	}
	validateStartTime(){
		var now = new Date();
		now.setHours(now.getHours() - 8);
		now = now.toJSON();
		var startTimeInFuture = (now < this.state.eventStartTime);
		return (!this.state.eventStartTime || startTimeInFuture);
	}
	validateFields(){
		var allFieldsFilled = (this.state.eventName && this.state.eventStartTime
			    && this.state.eventDescription && this.state.eventLocation);
		return (allFieldsFilled);
	}
	validateForm(){
		var validFields = this.validateFields(); 
		var validTime = this.validateStartTime(); 
		return (validFields && validTime);
	}
	handleEventLocation(e){
		this.setState({ eventLocation: e.target.value});
	}
	handleEventStartTime(e){
		this.setState({ eventStartTime: e.target.value});
	}
	handleEventDescription(e){
		this.setState({ eventDescription: e.target.value});
	}
	createForm() {
		this.setState({
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
		});
		this.toggle();
	}
	submitForm() {
		var url = "https://djque.herokuapp.com/?query="; 
		var eventName = this.state.eventName;
		var eventLocation = this.state.eventLocation;
		var eventTime = this.state.eventStartTime;
		eventTime = eventTime.replace('T', ' ');
		eventTime += ':00';
		var eventDescription = this.state.eventDescription;
		var query = "INSERT INTO Events (name, startTime, description, location, userId, isEnded, songAmt) VALUES ('"; 
		query +=  eventName + "', '";
		query += eventTime + "', '" 
		query += eventDescription + "', '" 
		query += eventLocation + "','";
		query += this.props.user.id + "', 0, 0); ";

		fetch(encodeURI(url + query)).then((res) => {
			return res.json();
		}).then((res) => {
			//console.log(res);
		});
		this.props.eventCreated();
		this.toggle();
		this.toggleNested();
	}
	render() {
		return (
			<div id="createEventFormOuterDiv" className="createEventFormButton">
				<Button color="danger" onClick={this.createForm} className="button-create" id="addEventButton">+</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="createEventModal">
					<ModalBody>
						<div>
							<Form>
								<header>
									<h2 className="formTitle">Create New Event</h2>
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
							    	<label>Event Time</label>
							    	<div>
							    		<input type="datetime-local"
						    		    	className="createEventFieldInput"
						         	    	onChange={this.handleEventStartTime}
						    		    	value={this.state.eventStartTime}/>
							    	</div>
							  	</div>


							  	<div>
							    	<label>Location</label>
							    	<div>
							      		<input type="text" maxLength="255"
							             	className="createEventFieldInput"
						    			 	onChange={this.handleEventLocation}
						    		     	value={this.state.eventLocation}/> 
							   		</div>
							  	</div>
							    
							  	<div>
							    	<label>Event Description</label>
							    	<div>
							      		<textarea rows="5"
							               	className="createEventFieldInput"
						    			   	onChange={this.handleEventDescription}
						    		       	value={this.state.eventDescription}></textarea>
							    	</div>
							  	</div>
							    { this.validateFields() ? null : 
							    		<div><div>Please fill out all fields.</div></div> }
						    	<div>
						    		{ this.validateStartTime() ? null : 
						    			<div>Please select an Event Time in the future.</div>}
						    	</div>
							</Form>
						</div>
            			<br />
          			</ModalBody>
          			<ModalFooter>
            			<Button disabled={!this.validateForm} color="primary" onClick={this.submitForm}>Submit</Button>
           				{' '}
            			<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          			</ModalFooter>
        		</Modal>
        		<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} className="createEventNestedModal">
              		<ModalHeader>Success!</ModalHeader>
              		<ModalBody>Your event has been created.</ModalBody>
              		<ModalFooter>
                		<Button color="primary" onClick={this.toggleNested}>Done</Button>
              		</ModalFooter>
            	</Modal>
			</div>
		);
	}
}

export default CreateEventForm; 
