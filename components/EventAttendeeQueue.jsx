import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
import { formatDateTime } from '../timeConverter.js';
import Scroll from 'react-scroll';
import Database from '../databaseShortcuts.js';
var speakerUrl = require('../resources/images/speaker.png');

class EventAttendeeQueue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songTitles: props.songTitles,
			hoverQueueId: -1,
			queue: props.songQueue,
			queueSequence: props.queueSequence
		};
		this._isMounted = false;
		this.isSongPlaying = this.isSongPlaying.bind(this);
		this.scroll = Scroll.animateScroll;
		this.handleHoverQueueItem = this.handleHoverQueueItem.bind(this);
		this.handleUnhoverQueueItem = this.handleUnhoverQueueItem.bind(this);
		//this.poll = this.poll.bind(this);
		//this.startPolling = this.startPolling.bind(this);
		this.refreshSongPlaying = this.refreshSongPlaying.bind(this);
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			songTitles: newProps.songTitles,
			queue: newProps.songQueue,
			queueSequence: newProps.queueSequence
		});
		this.props = newProps;
	}
	omponentWillUpdate() {
		var node = ReactDOM.findDOMNode(this.refs.attendeeQueue);
		this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	}
	componentDidUpdate() {
		if (this.shouldScrollBottom) {
			var node = ReactDOM.findDOMNode(this.refs.attendeeQueue);
			node.scrollTop = node.scrollHeight;
			this.scroll.scrollTo(node.scrollHeight+500);
			console.log("SCROLL");
		}
		this.scroll.scrollToBottom();
	}
	componentWillMount() {
		this._isMounted = true;
		this.startPolling();
	}
	componentWillUnmount() {
		if(this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}
		this._isMounted = false;
	}
	/*shouldComponentUpdate(nextProps, nextState) {
		if(nextState.queue.length !== this.state.queue.length)
			return true;
		var i;
		for(i=0;i<nextState.queue.length;i++) {
			if(this.state.queue[i] !== nextState.queue[i]) {
				return true;
			}
		}
		return false;
	}*/
	startPolling() {
		if(!this.props.eventIsEnded) {
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
		this.refreshSongPlaying();
	}
	handleHoverQueueItem(i) {
		this.setState({hoverQueueId:i});
	}
	handleUnhoverQueueItem(i){
		this.setState({hoverQueueId: -1});
	}
	refreshSongPlaying() {
		var currSongQuery = "SELECT currSongSeq FROM Events WHERE id="+ this.props.getEventId() + ";";
		Database(currSongQuery).then((res) => {
			this.setState({currSongSeq: res[0].currSongSeq});
		});
	}
	isSongPlaying(i) {
		if ((this.state.queueSequence[i])===this.state.currSongSeq) {
			return true;
		}
		else
			return false;
	}
	render() {
		return(
			<div id="attendee-queue">
				<ul id="attendee-queue-list"  ref="attendeeQueue">
				{ 	this.state.songTitles.map((title, i) => {
						return 	<li key={i} className="attendee-songOuterDiv">		 
									<a target="_blank" href={"https://www.youtube.com/watch?v="+this.state.queue[i]}>
										<div onMouseEnter={() => {this.handleHoverQueueItem(i)}} onMouseLeave={() => {this.handleUnhoverQueueItem(i)}} className={this.isSongPlaying(i) ? "divHovered attendee-songInnerDiv attendee-curSong hvr-back-pulse-constant" : (this.state.hoverQueueId === i ? "divHovered attendee-songInnerDiv hvr-back-pulse2" :"divNotHovered attendee-songInnerDiv")} ref={this.isSongPlaying(i) ?"curSong": null} id={this.isSongPlaying(i) ?"curSong": null}>
												<div className="attendee-queue-title attendee-queue-link">{this.isSongPlaying(i) ? title : (this.state.hoverQueueId === i ? title : (title.length > 47 ? title.substring(0, 47)+'...' : title ))}</div>
												{this.isSongPlaying(i) ?<div className="attendee-queue-img"><img src={speakerUrl} id="speaker-icon"></img></div>:null}
								        </div>
							        </a>
							    </li>
			       	})
		    	}
		    	</ul>
	    	</div>
		);
	}
}

export default EventAttendeeQueue;