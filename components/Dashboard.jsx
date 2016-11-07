import React from 'react';
import Search from './Search.jsx';
import ControlledTabs from './ControlledTabs.jsx';
import CreateEventForm from './CreateEventForm.jsx';
//import CardStack from './CardStack.jsx';
//import Card from './Card.jsx';
import { CardStack, Card } from 'react-cardstack';
require("../resources/css/dashboard.css");
var url = 'https://djque.herokuapp.com/?query=';
import { Tabs, Tab } from 'reactstrap';
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsCreated: [],
			eventsAttending: [],
			eventsAttended: [],
			//tabKey: 1,
			myEventsStyle: {
				display: 'block'
			},
			otherEventsStyle: {
				display: 'none'
			}
		};
		this.refreshEventsList = this.refreshEventsList.bind(this);
		//this.refreshEventsList();
		this.eventCreated = this.eventCreated.bind(this);
		this.selectTab = this.selectTab.bind(this);
	}
	refreshEventsList() {
		var query = "SELECT * FROM Events WHERE userId="+this.props.user.id+";";
		var query1 = 'SELECT * FROM Events;';
		console.log(encodeURI(url + query));
		console.log(encodeURI(url + query1));
		fetch(encodeURI(url + query)).then((res) => {
		    return res.json();
		}).then((res) => {
			var created = [];
			var attending = [];
			var attended = [];
			var currentlyAttending = [];
			//var 
			var currentTime = new Date();
		});
		//setTimeout(refreshEventsList, 5000);
	}
	eventCreated() {

	}
	selectTab(key) {
		//this.setState({ tabKey: key });
		if(key == 1) {
			this.setState({
				myEventsStyle: {
					display: 'block'
				},
				otherEventsStyle: {
					display: 'none'
				}
			})
		}
		else {
			this.setState({
				myEventsStyle: {
					display: 'none'
				},
				otherEventsStyle: {
					display: 'block'
				}
			})
		}
	}
	render () {
		return (
			<div id="searchAndAdd">
				<Search />
				<CreateEventForm user={this.props.user} eventCreated={this.eventCreated} />
				<div>
					<ControlledTabs handleSelect={this.selectTab} />
				</div>
				<div id="myEventsDivsOuter" style={this.state.myEventsStyle}>
					<div id="presentMyEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Present:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
					<div id="futureMyEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Future:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
					<div id="futureMyEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Past:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
				</div>
				<div id="otherEventsDivsOuter" style={this.state.otherEventsStyle}>
					<div id="presentOtherEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Present:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
					<div id="futureOtherEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Future:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
					<div id="futureOtherEventsDiv" className="eventsDivs">
						<h1 className="eventTypeHeading">Past:</h1>
						<CardStack
						    height={300}
						    width={400}
						    background='#f8f8f8'
						    hoverOffset={25}>

						    <Card background='#2980B9'>
						        <h1>Number 1</h1>
						    </Card>

						    <Card background='#27AE60'>
						        <h1>Number 2</h1>
						    </Card>

						</CardStack>
					</div>
				</div>
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