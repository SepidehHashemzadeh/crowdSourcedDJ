import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
require("./../resources/css/createEventForm.css");

var CreateEventForm = React.createClass({
	getInitialState: function () {
		/*this.toggle = this.toggle.bind(this);
		this.toggleNested = this.toggleNested.bind(this);*/

		return { 
			eventName: 'hi',
			eventLocation: 'hi',
			eventStartTime: '',
			eventDescription: 'hi',
			creatingForm: false,
			modal: false,
			nestedModal: false
		}
	},

	toggle: function () {
			this.setState({ modal: !this.state.modal });
	},

	toggleNested: function () {
			this.setState({ nestedModal: !this.state.nestedModal });
	},

	handleEventName: function (e){
		this.setState({ eventName: e.target.value});
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
		debugger;
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

	renderNormal: function () {
		console.log('renderNormal');
		return (
			<div className="createEventFormButton">
				<Button color="danger" onClick={this.createForm} className="button-create">Create Event</Button>
				{/*<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalBody>
						<div>
							<form action="#">
							  <header>
							    <h2 className="formTitle">Create New Event</h2>
							    <div>add info to create event then u ken be partee leader</div>
							  </header>
							  
							  <div>
							    <label class="desc" id="title1" for="Field1">Event Name</label>
							    <div>
							      <input id="Field1" name="Field1" type="text" class="field text fn"size="8" tabindex="1"
							             className="createEventFieldInput"
						    			 onChange={this.handleEventName}
							             value={this.state.eventName}/>
							    </div>
							  </div>
							    

							  <div>
							    <label class="desc" id="title106" for="Field106">
							    	Event Time
							    </label>
							    <div>
							    <input type="datetime-local" id="Field106" name="Field106" class="field select medium" tabindex="11"
						    		    className="createEventFieldInput"
						         	    onChange={this.handleEventStartTime}
						    		    value={this.state.eventStartTime} />
							    </div>
							  </div>


							  <div>
							    <label class="desc" id="title3" for="Field3">
							      Location
							    </label>
							    <div>
							      <input id="Field3" name="Field3" type="text" spellCheck="false" maxLength="255" tabindex="3"
							             className="createEventFieldInput"
						    			 onChange={this.handleEventLocation}
						    		     value={this.state.eventLocation}/> 
							   	</div>
							  </div>
							    
							  <div>
							    <label class="desc" id="title4" for="Field4">
							      Event Description
							    </label>
							  
							    <div>
							      <textarea id="Field4" name="Field4" spellCheck="true" rows="5" cols="45" tabindex="4"
							               className="createEventFieldInput"
						    			   onChange={this.handleEventDescription}
						    		       value={this.state.eventDescription}></textarea>
							    </div>
							  </div>
							  

						    	<div className="submitEventButton"> 

						    		<button type="submit" onClick={this.submitForm} 
						    		        className="button-submit">Submit</button>
						    	</div>

						    	<div className="test">
						    		<h5>Your event name is: {this.state.eventName} </h5>
						    		<h5>Your event time is: {this.state.eventStartTime} </h5>
						    		<h5>Your event location is: {this.state.eventLocation} </h5>
						    		<h5>Your event description is: {this.state.eventDescription} </h5>
						    	</div>
							</form>
						</div>
            			<br />
            			<Button color="success" onClick={this.toggleNested}>Show Nested Model</Button>
           				<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
              				<ModalHeader>Nested Modal title</ModalHeader>
              				<ModalBody>Stuff and things</ModalBody>
              				<ModalFooter>
                				<Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                				<Button color="secondary" onClick={this.toggle}>All Done</Button>
              				</ModalFooter>
            			</Modal>
          			</ModalBody>
          			<ModalFooter>
            			<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            			<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          			</ModalFooter>
        		</Modal>*/}
			</div>
		);
	},

	renderForm: function() {
	    return (
	    	<div className="createEventFormDiv">
		    	<form>
				  <header>
				    <h2 className="formTitle">Create New Event</h2>
				    <div>add info to create event then u ken be partee leader</div>
				  </header>
				  
				  <div>
				    <label>Event Name</label>
				    <div>
				      <input type="text" size="8" 
				             className="createEventFieldInput"
			    			 onChange={this.handleEventName}
				             value={this.state.eventName}/>
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
			    		    value={this.state.eventStartTime} />
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
				      <textarea rows="5" cols="45"
				               className="createEventFieldInput"
			    			   onChange={this.handleEventDescription}
			    		       value={this.state.eventDescription}></textarea>
				    </div>
				  </div>
				  

			    	<div className="submitEventButton"> 
			    		<button type="submit" onClick={this.submitForm} 
			    		        className="button-submit">Submit</button>
			    	</div>

			    	<div className="test">
			    		<h5>Your event name is: {this.state.eventName} </h5>
			    		<h5>Your event time is: {this.state.eventStartTime} </h5>
			    		<h5>Your event location is: {this.state.eventLocation} </h5>
			    		<h5>Your event description is: {this.state.eventDescription} </h5>
			    	</div>
				</form>
			</div>
	    );
	}, 

	render: function () {
		console.log('start');
	    if(this.state.creatingForm) {
	    	return this.renderForm();
	    } else {
	    	return this.renderNormal();
	    }
	}
});

export default CreateEventForm; 

