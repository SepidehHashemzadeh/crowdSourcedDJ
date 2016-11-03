import React from 'react';
class AddEvent extends React.Component {
      render() {
               return (
			<button type="button" onClick={this.addEventClick}>Add Event</button>
	              );
      }

      addEventClick() {
        alert("Going to add event page!");
      }
}

export default AddEvent;