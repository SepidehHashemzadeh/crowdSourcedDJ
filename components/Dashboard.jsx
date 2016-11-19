import React from 'react';
import Search from './Search.jsx';
import SearchList from './SearchList.jsx';
import ControlledTabs from './ControlledTabs.jsx';
import CreateEventForm from './CreateEventForm.jsx'; 
import EventList from './EventList.jsx'
import EventPageLeader from './EventPageLeader.jsx';
require("../resources/css/dashboard.css");
require("../resources/css/eventList.css");
require("../resources/css/eventList.css");
var url = 'https://djque.herokuapp.com/?query=';
import { Tabs, Tab } from 'reactstrap';
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myPresent: [],
			myFuture: [],
			myPast: [],
			otherPresent: [],
			otherFuture: [],
			otherPast: [],
			myEventsStyle: {
				display: 'block',
				opacity: 1
			},
			otherEventsStyle: {
				display: 'none',
				opacity: 0
			},
			eventId: null,
			eventLeaderId: null,
			eventPageLeaderStyle: {
				display: 'none'
			},
			hideEventLeaderPage: true,
			hideEventsLists: false,
			searchStr: "",
			tabCurrKey: 1
		};
		this._isMounted = false;
		this.getCurrEventId = this.getCurrEventId.bind(this);
		this.getCurrEventLeaderId = this.getCurrEventLeaderId.bind(this);
		this.refreshEventsList = this.refreshEventsList.bind(this);
		this.backFromEventLeaderPage = this.backFromEventLeaderPage.bind(this);
		this.refreshEventsList();
		this.eventCreated = this.eventCreated.bind(this);
		this.selectTab = this.selectTab.bind(this);
		this.onEventListItemClick = this.onEventListItemClick.bind(this);
		this.startPolling = this.startPolling.bind(this);
		this.poll = this.poll.bind(this);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
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
	timeStampSorter(x,y) {
		return x.startTime-y.startTime;
	}
	refreshEventsList() {
		var query = "SELECT * FROM Events WHERE userId='"+this.props.user.id+"';";
		var query1 = 'SELECT * FROM Events;';
		fetch(encodeURI(url + query)).then((res) => {
		    return res.json();
		}).then((res) => {
			var myPresent = [];
			var myFuture = [];
			var myPast = [];
			if(res.length > 0) {
				var currentTime = new Date();
				res.map(function mapMyEvents(eventRow){
					var eventTime = new Date(eventRow.startTime);
					if(eventTime<=currentTime&&!eventRow.isEnded) {
						myPresent.push(eventRow);
					}
					else if(eventTime>currentTime) {
						myFuture.push(eventRow);
					}
					else {
						myPast.push(eventRow);
					}
				});
				myPresent.sort(this.timeStampSorter);
				myFuture.sort(this.timeStampSorter);
				myPast.sort(this.timeStampSorter);
			}
			this.setState({
				myPresent: myPresent,
				myFuture: myFuture,
				myPast: myPast
			});
		});
		var query2 = "SELECT * FROM Events WHERE id IN (SELECT eventId FROM Event_User WHERE userId='"+this.props.user.id+"');";
		fetch(encodeURI(url + query2)).then((res) => {
		    return res.json();
		}).then((res) => {
			var otherPresent = [];
			var otherFuture = [];
			var otherPast = [];
			if(res.length > 0) {
				var currentTime = new Date();
				res.map(function mapMyEvents(eventRow){
					var eventTime = new Date(eventRow.startTime);
					if(eventTime<=currentTime&&!eventRow.isEnded) {
						otherPresent.push(eventRow);
					}
					else if(eventTime>currentTime) {
						otherFuture.push(eventRow);
					}
					else {
						otherPast.push(eventRow);
					}
				});
				otherPresent.sort(this.timeStampSorter);
				otherFuture.sort(this.timeStampSorter);
				otherPast.sort(this.timeStampSorter);
			}
			this.setState({
				otherPresent: otherPresent,
				otherFuture: otherFuture,
				otherPast: otherPast
			});
		});
	}
	eventCreated() {
		 this.refreshEventsList();
	}
	selectTab(key) {
		if(key == 1) {
			this.setState({
				myEventsStyle: {
					display: 'block',
					opacity: 1
				},
				otherEventsStyle: {
					display: 'none',
					opacity: 0
				},
				tabCurrKey: 1
			})
		}
		else {
			this.setState({
				myEventsStyle: {
					display: 'none',
					opacity: 0
				},
				otherEventsStyle: {
					display: 'block',
					opacity: 1
				},
				tabCurrKey: 2
			})
		}
	}
	onEventListItemClick(eventId, eventLeaderId){
		this.setState({
			eventId: eventId,
			eventLeaderId: eventLeaderId
		});
		this.setState({
			eventPageLeaderStyle: {
				display: 'block'
			},
			hideEventLeaderPage: false,
			hideEventsLists: true
		});
	}
	getCurrEventId() {
		return this.state.eventId;
	}
	getCurrEventLeaderId() {
		return this.state.eventLeaderId;
	}
	backFromEventLeaderPage() {
		this.setState({
			hideEventLeaderPage: true,
			hideEventsLists: false
		});
		if(this.state.eventLeaderId === this.props.user.id) {
			this.selectTab(1);
		}
		else {
			this.selectTab(2);
		}
	}
	onSearchTermChange(searchStr) {
		this.setState({searchStr: searchStr})
	}
	startPolling() {
		setTimeout(function(){
			if(!this._isMounted) {
				return; //abandon
			}
			this.poll();
			this._timer = setInterval(this.poll.bind(this), 7000);
		}.bind(this), 1000);
	}
	poll() {
		this.refreshEventsList();
	}
	render () {
		var noEvents = <div className="noEvents hvr-back-pulse2">No Events 😔</div>;
		var eventList = (listOfEvents, title, name) => (
			<div><h1 className="eventTypeHeading">{title}:</h1>
			{listOfEvents.length>0?
				<EventList eventList={listOfEvents} name={name} currUserInfo={this.props.user} handleClick={this.onEventListItemClick}/>
				:noEvents}
				</div>
		);
		return (
			<div id="searchAndAdd">
				<Search onSearchTermChange={this.onSearchTermChange}/>
				<CreateEventForm user={this.props.user} eventCreated={this.eventCreated}/>
				<SearchList searchStr={this.state.searchStr} user={this.props.user}/>
				<div style={this.state.eventPageLeaderStyle}>
					{this.state.hideEventLeaderPage ? null : <EventPageLeader getEventId={this.getCurrEventId} 
															getEventLeaderId={this.getCurrEventLeaderId} 
															currentUserId={this.props.user.id} 
															eventID={this.state.eventId} 
															back={this.backFromEventLeaderPage}
															eventCreated={this.eventCreated}/>}
				</div>
				{ this.state.hideEventsLists ? null : 
				<div>
					<div>
						<ControlledTabs handleSelect={this.selectTab} tabCurrKey={this.state.tabCurrKey}/>
					</div>
					<div id="myEventsDivsOuter" style={this.state.myEventsStyle}>
						<div id="presentMyEventsDiv" className="eventsDivs">
							{eventList(this.state.myPresent, "Present", "presentMy")}
						</div>
						<div id="futureMyEventsDiv" className="eventsDivs">
							{eventList(this.state.myFuture, "Future", "futureMy")}
						</div>
						<div id="pastMyEventsDiv" className="eventsDivs">
							{eventList(this.state.myPast, "Past", "pastMy")}
						</div>
					</div>
					<div id="otherEventsDivsOuter" style={this.state.otherEventsStyle}>
						<div id="presentOtherEventsDiv" className="eventsDivs">
							{eventList(this.state.otherPresent, "Present", "presentOther")}
						</div>
						<div id="futureOtherEventsDiv" className="eventsDivs">
							{eventList(this.state.otherFuture, "Future", "futureOther")}
						</div>
						<div id="pastOtherEventsDiv" className="eventsDivs">
							{eventList(this.state.otherPast, "Past", "pastOther")}
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}

export default Dashboard;