import React from 'react';
class AddEvent extends React.Component {
	render() {
        return (
			<span id="addEventButton" className="btnadd" onClick={this.addEventClick}>Add Event</span>
	    );
    }

    addEventClick() {
    	alert("Going to add event page!");
    }
}

export default AddEvent;