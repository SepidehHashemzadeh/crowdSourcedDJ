import React from 'react';
import ReactDOM from 'react-dom';
//require("./../resources/css/homePage.css");
require("./../resources/css/createEventForm.css");
var CreateEventForm = React.createClass({
	getInitialState: function() {
		return { 
			eventName: '',
			eventLocation: '',
			eventStartTime: '',
			eventDescription: ''
		};
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


	render: function(){
	    return (
	    	<div className="createEventFormDiv">
	    		<h3>Use this form to create your event!!! cool!!!</h3>
		    		<h5>Event Name:</h5>
		    		<input type="text"

		    			   onChange={this.handleEventName}
		    		       value={this.state.eventName} />
		    		<h5>Your event name is: {this.state.eventName} </h5>

	    		<h5>Start Time:</h5>
	    		<input type="datetime-local"
	    			   onChange={this.handleEventStartTime}
	    		       value={this.state.eventStartTime} />
	    		<h5>Your event time is: {this.state.eventStartTime} </h5>

	    		<h5>Location:</h5>
	    		<input type="text"
	    			   onChange={this.handleEventLocation}
	    		       value={this.state.eventLocation} />
	    		<h5>Your event location is: {this.state.eventLocation} </h5>

				<h5>Description:</h5>
	    		<textarea
	    			   rows="4"
	    			   cols="40"
	    			   onChange={this.handleEventDescription}
	    		       value={this.state.eventDescription} />
	    		<h5>Your event description is: {this.state.eventDescription} </h5>
	    		
	    	</div>
	    );
	}
});

export default CreateEventForm;