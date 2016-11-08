import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import YouTubePlayer from 'react-youtube-player';
require("./../resources/css/eventPage.css");

class EventPageLeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
			eventID: 22,
			songID: "",
			queue: []
		};
		this.render = this.render.bind(this);
	}
	componentWillMount() {
		var url = "https://djque.herokuapp.com/?query="; 

		var eventQuery = "SELECT * FROM Events WHERE id="+ this.state.eventID + ";";
		console.log(encodeURI(url + eventQuery));
		fetch(encodeURI(url + eventQuery)).then((res) => {
			return res.json();
		}).then((res) => {
			this.setState({
				eventName: res[0].name,
				eventLocation: res[0].location,
				eventStartTime: res[0].startTime,
				eventDescription: res[0].description
			});
		});

		var songQuery = "SELECT songUrl FROM Event_Song WHERE eventId="+ this.state.eventID + ";";
		var vidIds = [];
		fetch(encodeURI(url + songQuery)).then((res) => {
			return res.json();
		}).then((res) => {
			res.map(function(item) {
				var videoId = item.songUrl.substring(item.songUrl.indexOf('=')+1);
				vidIds.push(videoId);
				console.log(videoId);
			});
			this.setState({
				queue: vidIds
			});
		});
	}
	formatDateTime() {
		var year = this.state.eventStartTime.toString().substring(0,4);
		var month = this.state.eventStartTime.toString().substring(5,7);
		var date = this.state.eventStartTime.toString().substring(8,10);

		var hour = this.state.eventStartTime.toString().substring(11,13);
		var minute = this.state.eventStartTime.toString().substring(14,16);
		var period = "AM";

		if (hour == "13" | hour == "14" | hour == "15" | hour == "16" | hour == "17" | hour == "18" | hour == "19" | hour == "20" | hour == "21" | hour == "22" | hour == "23")
			period = "PM";

		if (month == "1") month = "January";
		else if (month == "2") month = "February";
		else if (month == "3") month = "March";
		else if (month == "4") month = "April";
		else if (month == "5") month = "May";
		else if (month == "6") month = "June";
		else if (month == "7") month = "July";
		else if (month == "8") month = "August";
		else if (month == "9") month = "September";
		else if (month == "10") month = "October";
		else if (month == "11") month = "November";
		else if (month == "12") month = "December";

		if (date == "01" | date == "02" | date == "03" | date == "04" | date == "05" | date == "06" | date == "07" | date == "08" | date == "09")
			date = date.substring(1,2);

		if (hour == "01" | hour == "02" | hour == "03" | hour == "04" | hour == "05" | hour == "06" | hour == "07" | hour == "08" | hour == "09")
			hour = hour.substring(1,2);
		else if (hour == "13")	hour = "1";
		else if (hour == "14")	hour = "2";
		else if (hour == "15")	hour = "3";
		else if (hour == "16")	hour = "4";
		else if (hour == "17")	hour = "5";
		else if (hour == "18")	hour = "6";
		else if (hour == "19")	hour = "7";
		else if (hour == "20")	hour = "8";
		else if (hour == "21")	hour = "9";
		else if (hour == "22")	hour = "10";
		else if (hour == "23")	hour = "11";
		else if (hour == "00")	hour = "12";

		var formattedDateTime = month.concat(" ", date, ", ", year, " at ", hour, ":", minute, " ", period);

		return formattedDateTime;
	}
	render() {
		return (
			<div id="eventPageLeader">
				<h2 className="eventName">{this.state.eventName}</h2>
				<p className="eventDetails">{this.state.eventLocation}</p>
				<p className="eventDetails">{this.formatDateTime()}</p>
				<br/>
				<p className="eventDetails">{this.state.eventDescription}</p>
				<hr/>
				<div id="addSong">
					<p>Search</p>
				</div>
				<hr/>
				<div id="queue">
					<p>Event Queue</p>
					<div id="videos">
					{ 	this.state.queue.map(function(vidID, i) {
							return 	<div key={i} >
										<YouTubePlayer
							            	height='350'
							            	playbackState='paused'
							            	videoId={vidID}
							            	width='680'
							        	/> <br/>
							        </div>
				       	})
			    	}
		    		</div>
				</div>
			</div>
		);
	}
}

export default EventPageLeader; 