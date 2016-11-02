import React from 'react';
import ReactDOM from 'react-dom';
require("./../resources/css/createEventForm.css");


var CreateEventForm = React.createClass({
	getInitialState: function () {
		return { 
			eventName: null,
			eventLocation: null,
			eventStartTime: null,
			eventDescription: null,
			creatingForm: false,
			isNameValid: false,
			hasTriedSubmitting: false,
			submitDisabled: true
		}
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
		this.setState({hasTriedSubmitting:true});
		this.setState({creatingForm:false});
		var eventName = this.state.eventName;
		var eventLocation = this.state.eventLocation;
		var eventTime = this.state.eventStartTime;
		var eventDescription = this.state.eventDescription;

		// var query = 'INSERT INTO Events (name, startTime, description, location, userId, isEnded) VALUES (' + 
		// 	eventName + ', ' + eventTime + ', ' + eventDescription + ', ' + eventLocation + ', 1, false)';

		// alert('Starting ajax call');
		this.setState({creatingForm:false});

		// var URL = 'localhost:3000/?query='+ query; 
		// alert(URL);

		// $.ajax({
		// 	type:'POST',
		// 	dataType: 'json',
		// 	url: URL,
		// 	success: function(data){
		// 		alert('loaded');
		// 	}.bind(this),
		// 	error: function(data){
		// 		alert('error');
		// 	}.bind(this)
		// });
		// alert('Finished ajax call');
	},

	renderNormal: function () {
		return (
			<div className="createEventFormButton">
				<button onClick={this.createForm} className="button-create">Create Event</button>
			</div>
		);
	},

	renderForm: function() {
	    return (
	    	<div className="createEventFormDiv">
		    	<form action="#">
				  <header>
				    <h2 className="formTitle">Create New Event</h2>
				    <div></div>
				  </header>
				  
				  <div>
				    <label class="desc" id="title1" for="Field1">Event Name</label>
				    <div>
				      <input id="Field1" name="Field1" type="text" class="field text fn"size="8" tabindex="1"
				             className="createEventFieldInput"
			    			 onChange={this.handleEventName}
				             value={this.state.eventName}
				             maxLength="255"/>
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
			    		    value={this.state.eventStartTime}/>
				    </div>
				  </div>


				  <div>
				    <label class="desc" id="title3" for="Field3">
				      Location
				    </label>
				    <div>
				      <input id="Field3" name="Field3" type="text" spellcheck="false" maxLength="255" tabindex="3"
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
				      <textarea id="Field4" name="Field4" spellcheck="true" rows="5" tabindex="4"
				               className="createEventFieldInput"
			    			   onChange={this.handleEventDescription}
			    		       value={this.state.eventDescription}></textarea>
				    </div>
				  </div>
				  
				  	
				    { this.validateForm() ? 
					    	<div className="submitEventButton"> 
			    			    <button type="submit" class="myButton" OnClick={this.submitForm} 
			    		        className="button-submit">Submit</button> 
					    	</div>

				    	: 
				    		<div><div>Please fill out all required fields.</div></div> }

			    	<div>
			    		{this.validateStartTime() ? null : 
			    			<div>Please select an Event Time in the future.</div>}
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
	    if(this.state.creatingForm) {
	    	return this.renderForm();
	    } else {
	    	return this.renderNormal();
	    }
	}
});

export default CreateEventForm; 

