import React from 'react';
import Search from './Search.jsx';
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
			eventPageLeaderStyle: {
				display: 'none'
			},
			hideEventLeaderPage: true,
			hideEventsLists: false
		};
		this.getCurrEventId = this.getCurrEventId.bind(this);
		this.refreshEventsList = this.refreshEventsList.bind(this);
		this.backFromEventLeaderPage = this.backFromEventLeaderPage.bind(this);
		this.refreshEventsList();
		this.eventCreated = this.eventCreated.bind(this);
		this.selectTab = this.selectTab.bind(this);
		this.onEventListItemClick = this.onEventListItemClick.bind(this);
		setTimeout(this.refreshEventsList, 5000);
	}
	timeStampSorter(x,y) {
		return x.startTime-y.startTime;
	}
	refreshEventsList() {
		var query = "SELECT * FROM Events WHERE userId='"+this.props.user.id+"';";
		var query1 = 'SELECT * FROM Events;';
		console.log(encodeURI(url + query));
		console.log(encodeURI(url + query1));
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
		console.log(encodeURI(url + query2));
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
				}
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
				}
			})
		}
	}
	onEventListItemClick(eventId){
		console.log(eventId);
		this.setState({
			eventId: eventId
		});
		this.setState({
			eventPageLeaderStyle: {
				display: 'block'
			},
			hideEventLeaderPage: false,
			hideEventsLists: true
		})
	}
	getCurrEventId() {
		return this.state.eventId;
	}
	backFromEventLeaderPage() {
		this.setState({
			hideEventLeaderPage: true,
			hideEventsLists: false
		});
	}
	render () {
		var noEvents = <div className="noEvents hvr-back-pulse2">No Events 😔</div>;
		var eventList = (listOfEvents, title, name) => (
			<div><h1 className="eventTypeHeading">{title}:</h1>
			{listOfEvents.length>0?
				<EventList eventList={listOfEvents} name={name} handleClick={this.onEventListItemClick}/>
				:noEvents}
				</div>
		);
		return (
			<div id="searchAndAdd">
				<Search />
				<CreateEventForm user={this.props.user} eventCreated={this.eventCreated} />
				<div style={this.state.eventPageLeaderStyle}>
					{this.state.hideEventLeaderPage ? null : <EventPageLeader getEventId={this.getCurrEventId} eventID={this.state.eventId} back={this.backFromEventLeaderPage}/>}
				</div>
				{ this.state.hideEventsLists ? null : 
				<div>
					<div>
						<ControlledTabs handleSelect={this.selectTab} />
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
const Picture = ({ imgSrc, borderColor }) => (
	<img
		style={{
			width: '60px',
			height: '60px',
			borderRadius: '100%',
			border: `3px solid ${borderColor}`,
		}}
		src={imgSrc}
	/>
);

const DetailsRow = ({ icon, title, summary }) => {
	const renderSummary = () => {
		if (summary)	return (
			<p style={{ fontWeight: 300, lineHeight: 1.45 }}>
				{summary}
			</p>
		);
		return null;
	};

	return (
		<div style={styles.detailsRow.row}>
			<span
			className={`icon ${icon}`}
			style={{ /*...styles.detailsRow.icon,*/ alignSelf: 'flex-start' }}
			/>
			<div style={{ width: '80%' }}>
				<h2 style={styles.detailsRow.title}>
					{title}
				</h2>
				{renderSummary()}
			</div>
		</div>
	);
};
const Event = (props) => (
	<div style={{ position: 'absolute', top: 0 }} onClick={props.onClick}>
		<header style={styles.cardHeader} className='card-header-details'>
			<Picture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
			<div>
				<h1 style={styles.headerName}>{props.name}</h1>
				<h3 style={styles.headerTitle} className='icon ion-ios-arrow-down'>{props.title}</h3>
			</div>
		</header>

		<div style={{color: '#fff'}}>
			<DetailsRow
				icon='ion-ios-telephone-outline'
				title={props.mobileNo}
			/>

			<DetailsRow
				icon='ion-ios-location-outline'
				title={props.location}
			/>

			<DetailsRow
				icon='icon ion-ios-paper-outline'
				title='Main Role'
				summary={props.role}
			/>
		</div>
  </div>
);

export default Dashboard;