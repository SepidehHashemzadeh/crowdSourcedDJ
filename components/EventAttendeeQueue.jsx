import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
import { formatDateTime } from '../timeConverter.js';
import Scroll from 'react-scroll';
var url = 'https://djque.herokuapp.com/?query=';
require("../resources/css/eventList.css");
class EventAttendeeQueue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songTitles: props.songTitles,
			hoverQueueId: -1,
			queue: props.songQueue
		};
		this.scroll = Scroll.animateScroll;
		this.handleHoverQueue = this.handleHoverQueue.bind(this);
		this.handleUnhoverQueue = this.handleUnhoverQueue.bind(this);
	}
	componentWillReceiveProps(newProps) {
		/*this.setState({
			songTitles: newProps.songTitles,
			queue: newProps.songQueue
		});*/
		this.state.songTitles.splice(0, this.state.songTitles.length);
		this.state.queue.splice(0, this.state.queue.length);
		this.state.songTitles.push(...newProps.songTitles);
		this.state.queue.push(...newProps.songQueue);
		//this.scroll.scrollToBottom();
	}
	componentWillUpdate() {
		//var node = ReactDOM.findDOMNode(this);
		//this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
		//this.scroll.scrollToBottom();
	}
	componentDidUpdate() {
		/*if (this.shouldScrollBottom) {
			var node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight
		}*/
		//ReactDOM.findDOMNode(this.refs.attendeequeue).scrollTop = ReactDOM.findDOMNode(this.refs.attendeequeue).height;
		//ReactDOM.findDOMNode(this.refs.attendeequeue).focus();
		//this.scroll.scrollToBottom();
	}
	handleHoverQueue() {
		this.setState({hoverQueueId:i});
	}
	handleUnhoverQueue(){
		this.setState({hoverQueueId: -1});
	}
	getDivClass(i){
		/*
		var url = "https://djque.herokuapp.com/?query=";
		var currSongQuery = "SELECT currSongSeq FROM Events WHERE id="+ this.props.getEventId() + ";";
		fetch(encodeURI(url + currSongQuery)).then((res) => {
			return res.json();
		}).then((res) => {
			this.setState({currSongSeq: res[0].currSongSeq});
			
		});
		if ((this.state.queueSequence[i]-1)==this.state.currSongSeq) 	
			return "divHovered";
		else
			return "divNotHovered";
		*/
		return "divNotHovered";
	}
	render() {
		return(
			<div id="attendee-queue">
				<div id="attendee-queue-list">
				{ 	this.state.songTitles.map((title, i) => {
						return 	<div key={i}>
									<div className={this.getDivClass(i) + " attendee-songOuterDiv songPlaying hvr-back-pulse2"}>
										<a target="_blank" href={"https://www.youtube.com/watch?v="+this.state.queue[i]}>
											<div className="attendee-songInnerDiv"
												 onMouseEnter={() => this.handleHoverQueue.bind(i)}
												 onMouseLeave={this.handleUnhoverQueue}>
												{(this.state.hoverQueueId == i) ? 
													{title}
												:
													<p>{title}</p>
												}
								        	</div>
							        	</a>
							        </div>
							    </div>
			       	})
		    	}
		    	</div>
	    	</div>
		);
	}
}

export default EventAttendeeQueue;