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
	/*formatDateTime() {
		var year = this.state.eventStartTime.substring(0,3);
		var month = this.state.eventStartTime.substring(5,6);
		var date = this.state.eventStartTime.substring(8,9);
		console.log(year);
	}*/
	render() {
		return (
			<div id="eventPageLeader">
				<h2 className="eventName">{this.state.eventName}</h2>
				<p className="eventLocationTime">{this.state.eventLocation} at {this.state.eventStartTime}</p>
				<p>{this.state.eventDescription}</p>
				<hr/>
				<div id="addSong">
					<p>Add Song to Queue Here!</p>
				</div>
				<hr/>
				<div id="queue">
					<p>Display Widgets Here!</p>
					{ 	this.state.queue.map(function(vidID, i) {
							return 	<div key={i}>
										<YouTubePlayer
							            	height='150'
							            	playbackState='paused'
							            	videoId={vidID}
							            	width='320'
							        	/> <br/>
							        </div>
				       	})
			    	}
				</div>
			</div>
		);
	}
}

export default EventPageLeader; 