import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, ButtonToolbar } from 'reactstrap';
import YouTubePlayer from 'react-youtube-player';
import SearchSong from './SearchSong.jsx';
import _ from 'lodash';
import Database from '../databaseShortcuts.js';
import { formatDateTime } from '../timeConverter.js';
import EventPageLeaderInviteNotificationStack from './EventPageLeaderInviteNotificationStack.jsx';
import EditForm from './EditForm.jsx';
import EventAttendeeQueue from './EventAttendeeQueue.jsx';
require("./../resources/css/eventPage.css");
require("../resources/css/eventList.css");
var yt = require('../youtube.js');
var speakerUrl = require('../resources/images/speaker.png');

class EventPageLeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			eventName: "",
			eventLocation: "",
			eventStartTime: "",
			eventDescription: "",
			eventIsEnded: false,
			songID: "",
			currSongSeq: -1,
			queue: [],
			songTitles: [],
			modal: false,
			endEventModal: false,
			deleteID: "",
			queueState: [],
			queueSequence: [],
			hoverQueueId: -1,
			hide: false
		};
		this.render = this.render.bind(this);
		this.end = this.end.bind(this);
		this.delete = this.delete.bind(this);
		this.refreshQueue = this.refreshQueue.bind(this);
		this.refreshInvites = this.refreshInvites.bind(this);
		this.refreshEventInfo = this.refreshEventInfo.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleEnd = this.toggleEnd.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.onBuffer = this.onBuffer.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onError = this.onError.bind(this);
		this.onPause = this.onPause.bind(this);
		this.setAll = this.setAll.bind(this);
		this.onSongAdded = this.onSongAdded.bind(this);
		this.userIsLeader = this.userIsLeader.bind(this);
		this.getSongTitle = this.getSongTitle.bind(this);
		this.updateSongTitles = this.updateSongTitles.bind(this);
		this.startPolling = this.startPolling.bind(this);
		this.refreshInvites = this.refreshInvites.bind(this);
		this.poll = this.poll.bind(this);
		this.onEventEditSuccess = this.onEventEditSuccess.bind(this);
		this.isSongPlaying = this.isSongPlaying.bind(this);

		var eventQuery = "SELECT * FROM Events WHERE id="+ this.props.getEventId() + ";";
		Database(eventQuery).then((result) => {
			if(typeof result[0] != "undefined") {
				this.setState({
					eventName: result[0].name,
					eventLocation: result[0].location,
					eventStartTime: result[0].startTime,
					eventDescription: result[0].description,
					eventIsEnded: result[0].isEnded
				});
			}
		});
	}
	componentWillMount() {
		this._isMounted = true;
		this.refreshQueue(true);
		this.refreshInvites();
		//this.startPolling();
	}
	componentWillUnmount() {
		if(this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}
		this._isMounted = false;
	}
	startPolling() {
		if(!this.state.eventIsEnded) {
			setTimeout(() => {
				if(!this._isMounted) {
					return; //abandon
				}
				this.poll();
				this._timer = setInterval(this.poll.bind(this), 7000);
			}, 1000);
		}
	}
	poll() {
		if(this.userIsLeader()) {
			this.refreshInvites();
		}
		this.refreshQueue(false);
	}
	refreshInvites() {
		if(!this._isMounted) {
			return; //abandon
		}
		var inviteQuery = "SELECT * FROM Invites WHERE toId='"+this.props.currentUserId+"' AND eventId="+this.props.getEventId()+";"
		Database(inviteQuery).then(function(result) {
			if(typeof result != "undefined") {
				var pendingInvites = [];
				if(result.length>0) {
					result.map(function(item) {
						if(item.isPending) {
							pendingInvites.push(item);
						}
					}.bind(this));	
				}
				this.setState({
					pendingInvites: pendingInvites
				});
			}
		}.bind(this));
	}
	refreshEventInfo() {
		if(!this._isMounted) {
			return; //abandon
		}
		var eventQuery = "SELECT * FROM Events WHERE id="+ this.props.getEventId() + ";";
		Database(eventQuery).then((result) => {
			if(typeof result[0] != "undefined") {
				this.setState({
					eventName: result[0].name,
					eventLocation: result[0].location,
					eventStartTime: result[0].startTime,
					eventDescription: result[0].description,
					eventIsEnded: result[0].isEnded
				});
			}
		});
	}
	refreshQueue(isStateRefresh){
		var songQuery = "SELECT songUrl, sequence FROM Event_Song WHERE eventId="+ this.props.getEventId();
		songQuery += " ORDER BY sequence ASC;";
		var vidIds = [];
		var vidStates = [];	
		var vidSequences = [];
		Database(songQuery).then((res) => {
			if(typeof res != "undefined") {
				res.map(function(item) {
					var videoId = item.songUrl.substring(item.songUrl.indexOf('=')+1);
					var videoSequence = item.sequence;
					vidIds.push(videoId);
					vidSequences.push(videoSequence);
					vidStates.push('unstarted');
				});
				if(isStateRefresh) {
					this.setState({
						queue: vidIds,
						queueState: vidStates,
						queueSequence: vidSequences
					});
				}
				else {
					this.setState({
						queue: vidIds,
						queueSequence: vidSequences
					});
				}
				this.updateSongTitles();
			}
		});
	}
	end(){
		var endEventQuery = "UPDATE Events SET isEnded=true WHERE id="+this.props.getEventId()+";";
		Database(endEventQuery).then((res) => {
			this.setState({
				eventIsEnded: true
			});
		});

		var query = "UPDATE Events SET currSongSeq = -1 WHERE id = '" + this.props.getEventId() + "'; ";		
		Database(query).then(function(response) {
			//console.log("Changed currSongSeq to -1");
		}.bind(this));

		this.toggleEnd();
		this.props.back();
		this.props.eventCreated();
	}
	toggle() {
		this.refreshQueue(false);
		this.setState({ 
			modal: !this.state.modal
		});
	}
	toggleEnd() {
		this.setState({ 
			endEventModal: !this.state.endEventModal
		});
	}
	confirmDelete(vidID, key, sequence){
		this.setState({
			deleteID:vidID,
			deleteKey: key,
			deleteSequence: sequence
		});
		this.toggle();
	}
	delete(videoID, key, sequence){
		this.state.queueState.splice(key, 1);
		var deleteSongQuery = "DELETE FROM Event_Song WHERE songUrl='"+videoID+"' AND eventId="+this.props.getEventId()+" AND sequence="+sequence+";";

		Database(deleteSongQuery).then(function(res) {
			this.refreshQueue(false);
		}.bind(this));
		this.toggle();
	}
	onPlay(key) {
		return function() {
			this.setAll('unstarted');
			this.state.queueState[key] = 'playing';
			this.refreshQueue(false);

			var eventId = this.props.getEventId();
			var query = "UPDATE Events SET currSongSeq ='";
			query += this.state.queueSequence[key] + "' WHERE id = '";
			query += eventId + "'; ";
			
			Database(query).then(function(response) {
			}.bind(this));
		}.bind(this);

	}
	onBuffer(key) {
		return function() {
			this.setAll('unstarted');
			this.state.queueState[key] = 'buffering';
			this.refreshQueue(false);
		}.bind(this);
	}
	onEnd(key) {
		return function() {
			this.setAll('unstarted');
			if(key === this.state.queueState.length - 1) {
				this.state.queueState[0] = 'playing';
			}
			else {
				this.state.queueState[key+1] = 'playing';
			}
			this.refreshQueue(false);
		}.bind(this);
	}
	onError(key) {
		return function() {
			this.setAll('unstarted');
			this.state.queueState[key] = 'playing';
			this.refreshQueue(false);
		}.bind(this);
	}
	onPause(key) {
		return function() {
			this.setAll('unstarted');
			this.state.queueState[key] = 'paused';
			this.refreshQueue(false);
		}.bind(this);
	}
	onSongAdded() {
		this.refreshQueue(false);
	}
	setAll(v) {
	    var i, n = this.state.queueState.length;
	    for (i = 0; i < n; ++i) {
	        this.state.queueState[i] = v;
	    }
	}
	getSongTitle(vidID){
		yt.getTitleFromId(vidID, (title) => {
			this.setState({
    			songTitles: this.state.songTitles.concat(title)
			});
		});
	}
	updateSongTitles() {
		this.setState({songTitles:[]});
		this.state.queue.map((vidID) => {
			this.getSongTitle(vidID);
   		});
	}
	userIsLeader() {
		var currentUser = this.props.currentUserId;
		var eventLeader = this.props.getEventLeaderId();
		return (currentUser == eventLeader);
	}
	isSongPlaying(i) {
		var url = "https://djque.herokuapp.com/?query=";
		var currSongQuery = "SELECT currSongSeq FROM Events WHERE id="+ this.props.getEventId() + ";";
		fetch(encodeURI(url + currSongQuery)).then((res) => {
			return res.json();
		}).then((res) => {
			this.setState({currSongSeq: res[0].currSongSeq});
			
		});
		if ((this.state.queueSequence[i])==this.state.currSongSeq) {
			return true;
		}
		else
			return false;
	}
	onEventEditSuccess(newState) {
		this.setState(newState);
		this.forceUpdate();
	}
	render() {
		return (
			<div id="eventPageLeaderOuterDivId"> 
				{ (this.userIsLeader())?<EventPageLeaderInviteNotificationStack eventId={this.props.getEventId()} inviteList={this.state.pendingInvites}/>:null}
				<div id="eventPageLeader">
					<div>
						<h2 className="eventName">{this.state.eventName}</h2>
						<div>
							<div id="backButton">
								<Button color="default" onClick={this.props.back}>Back</Button>
							</div>
							{ (this.userIsLeader() && !this.state.eventIsEnded) ?  
								<div> 
									<div id="endButton">
										<Button color="danger" onClick={this.toggleEnd}>End Event</Button>
										<Modal isOpen={this.state.endEventModal} toggle={this.toggleEnd} className={this.props.className}>
								          	<ModalHeader>
								          		End Event
								          	</ModalHeader>
								          	<ModalBody>
								          		Are you sure you want to end this event? Videos cannot be added to the queue once an event has ended.
								          	</ModalBody>
								          	<ModalFooter>
								            	<Button color="danger" onClick={this.end}>End</Button>
								            	<Button color="secondary" onClick={this.toggleEnd}>Cancel</Button>
								          	</ModalFooter>
								        </Modal>
									</div>
									<div id="editButton">
										<EditForm eventId={this.props.getEventId()} refreshEventInfo={this.refreshEventInfo} onSuccess={this.onEventEditSuccess}/>
									</div>
								</div>
							:
								null 
							}
						</div>
					</div>
					<div className="eventDetails">
						{ (this.userIsLeader() && !this.state.eventIsEnded) ?
							null
						:
							<br/>
						}

						{this.state.eventLocation}
						<br/>
						{ formatDateTime(this.state.eventStartTime.toString()) }
						<br/>
						<br/>
						{this.state.eventDescription}
					</div>
					
					{ this.state.eventIsEnded ? 
						<div className="eventDetails">
							<hr/>
							This event has ended.
						</div>
					 :
						<div id="addSong">
							<hr/>
							<div>Search</div>
							<SearchSong onSongAdded={this.onSongAdded} eventId={this.props.getEventId()}/>
						</div>
					}
					<hr/>
					{ (this.userIsLeader() || this.state.eventIsEnded) ? 
						<div id="queue">
							<div>Music Queue</div>
							<div id="videos">
							{ 	this.state.queue.map((vidID, i) => {
									return 	<div key={i} className="videoOuterDiv">
												<div className="videoInnerDiv">
												{
								            		i===0 ? 
								            		<YouTubePlayer
										            	height='270'
										            	playbackState='unstarted'
										            	videoId={vidID}
										            	width='480'
										            	//configuration={{autoplay:1}}
										            	configuration={{
										            		enablejsapi: 1,
										            		origin:"http://localhost:8080",
										            		modestbranding: 1,
										            		disablekb: 1,
										            	}}
										            	onPlay={this.onPlay(i)}
										            	onBuffer={this.onPlay(i)}
										            	onEnd={this.onEnd(i)}
										            	onError={this.onError(i)}
										            	onPause={this.onPause(i)}
										            	playbackState= {this.state.queueState[i]}
										        	/>
								            		:
													<YouTubePlayer
										            	height='270'
										            	playbackState='unstarted'
										            	videoId={vidID}
										            	width='480'
										            	//configuration={{autoplay:0}}
										            	configuration={{
										            		enablejsapi: 1,
										            		origin:"http://localhost:8080",
										            		modestbranding: 1,
										            		disablekb: 1,
										            	}}
										            	onPlay={this.onPlay(i)}
										            	onBuffer={this.onPlay(i)}
										            	onEnd={this.onEnd(i)}
										            	onError={this.onError(i)}
										            	onPause={this.onPause(i)}
										            	playbackState= {this.state.queueState[i]}
										        	/>
										        }
									        	</div>
									        	{ this.state.eventIsEnded ? null :
									        		<span className="videoDeleteButton" onClick={() => {this.confirmDelete(vidID, i, this.state.queueSequence[i])}}>x</span>
									        	}
									        	<br/>
									        </div>
						       	})
					    	}
				    		</div>
						</div>
						:
							<div id="attendee-queue">
								<p id="attendee-queue-title">Music Queue</p>
								<EventAttendeeQueue eventIsEnded={this.state.eventIsEnded} queueSequence={this.state.queueSequence} songTitles={this.state.songTitles} songQueue={this.state.queue} getEventId={this.props.getEventId}/>
							</div>
					}
					<Modal isOpen={this.state.modal} toggle={this.toggle} className="createEventNestedModal">
	              		<ModalHeader>Are you sure you want to delete this song from your Music Queue?</ModalHeader>
	              		<ModalFooter>
	                		<Button color="warning" onClick={() => {this.delete(this.state.deleteID, this.state.deleteKey, this.state.deleteSequence)}}>Delete</Button>
	                		<Button color="default" onClick={this.toggle}>Cancel</Button>
	              		</ModalFooter>
	            	</Modal>
				</div>
			</div>
		);
	}
}

export default EventPageLeader; 
