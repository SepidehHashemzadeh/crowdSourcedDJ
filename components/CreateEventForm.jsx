import React from 'react';
import ReactDOM from 'react-dom';
require("./../resources/css/createEventForm.css");
var CreateEventForm = React.createClass({
	getInitialState: function () {
		return { 
			eventName: '',
			eventLocation: '',
			eventStartTime: '',
			eventDescription: '',
			creatingForm: false,
			isSubmitting: false,
		}
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
		alert("create event clicked");
		console.log("create event clicked");
		this.setState({creatingForm: true});
	},

	submitForm: function () {
		alert("submit form clicked");
		console.log("submit form clicked");
		this.setState({
			creatingForm:false,
			isSubmitting:true,	
		});
		var name = this.state.eventName;
		var location = this.state.eventLocation;
		var time = this.state.eventStartTime;
		var description = this.state.eventDescription;
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
				      <input id="Field3" name="Field3" type="text" spellcheck="false" maxlength="255" tabindex="3"
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
				      <textarea id="Field4" name="Field4" spellcheck="true" rows="5" cols="45" tabindex="4"
				               className="createEventFieldInput"
			    			   onChange={this.handleEventDescription}
			    		       value={this.state.eventDescription}></textarea>
				    </div>
				  </div>
				  

			    	<div className="submitEventButton"> 
			    		<button type="submit" OnClick={this.submitForm} 
			    		        className="button-submit"
			    		        disabled={this.state.isSubmitting}>Submit</button>
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

