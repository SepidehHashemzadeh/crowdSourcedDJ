import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
var url = 'https://djque.herokuapp.com/?query=';
require("../resources/css/eventList.css");

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getEventDiv = this.getEventDiv.bind(this);
		this.render = this.render.bind(this);
	}
	getEventDiv(eventInfo){
		var noImageUrl = require('../resources/images/noprofile.png');
		var query = "SELECT * FROM Users WHERE id='"+eventInfo.userId+"';";
		var query1 = 'SELECT * FROM Users;';
		fetch(encodeURI(url + query)).then((res) => {
		    return res.json();
		}).then((res) => {
			this.setState({ userInfo: res[0] });
			FB.api('/'+this.state.userInfo.id+'/picture', 'GET', {},
				function(response) {
					return response;
				}
			);			
		});
		if(typeof this.state.userInfo !== "undefined")
		{ 
			return (<li>
					<div>
						<p>
							{eventInfo.name}
						</p>
						<p>{eventInfo.description}</p>
						<p> Starts At: {eventInfo.startTime} </p>
						<p> Where: {eventInfo.location} </p>
						<p> By: {this.state.userInfo.name} </p>
					</div>
				</li>);
		}
	}
	render() {
		var cursorStyle = {
			cursor: "pointer"
		};
		return(
			<div id="eventListItemOuterDiv">
			    <ul>
					{this.props.eventList.map(this.getEventDiv)}
				</ul>
		    </div>
		);
	}
}

export default EventList;