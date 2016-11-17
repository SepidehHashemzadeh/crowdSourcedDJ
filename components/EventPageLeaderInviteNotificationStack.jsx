import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { getUserInfo } from '../databaseShortcuts.js';
import DatabaseHelper from '../databaseShortcuts.js';
require("./../resources/css/eventPageLeaderInviteNotificationStack.css");

class EventPageLeaderInviteNotificationStack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inviteList: [],
			notificationList: []
		};
		this.getNotificationsFromListOfInvites = this.getNotificationsFromListOfInvites.bind(this);
	}
	componentWillMount() {
		if(typeof this.props.inviteList != "undefined")
		{
			if(this.props.inviteList.length > 0) {
				this.getNotificationsFromListOfInvites(this.props.inviteList);
				this.setState({
					inviteList: this.props.inviteList,
				});
			}
		}
	}
	componentWillUnmount() {
	}
	componentWillReceiveProps(newProps) {
		if(typeof newProps.inviteList != "undefined") {
			this.setState({
				inviteList: newProps.inviteList
			});
			this.getNotificationsFromListOfInvites(newProps.inviteList);
		}
	}
	getNotificationsFromListOfInvites(invitesInput) {
		var invites = _.differenceBy(invitesInput, this.state.inviteList, 'fromId');
		if(invites.length > 0) {
			var promiseComplete = [];
			invites.map((invite, index) => {
				promiseComplete.push(false);
				getUserInfo(invite.fromId).then((res) => {
					promiseComplete[index] = true;
					if(typeof res != "undefined") {
						var userInfo = res[0];
						this.state.notificationList.push(
							userInfo
						);
						var flgForceUpdate = true;
						promiseComplete.map((promiseStatus) => {
							if(!promiseStatus) {
								flgForceUpdate = false;
							}
						});
						if(flgForceUpdate) {
							this.forceUpdate();
						}
					}
				})
			});
		}
	}
	render() {
		var items = this.state.notificationList.map((item, index) => {
			return (
				<li key={index} className="eventNotifListItem">
					<div className="eventNotifListItemInnerDiv">
						<span className="notifButton eventNotifListItemDismiss" onClick={() => {
							var query = "INSERT INTO Event_User VALUES ("+this.props.eventId+",'"+item.id+"');";
							DatabaseHelper(query).then((response) => {
								console.log(response);
								this.state.notificationList.splice(index, 1);
							});
						}}>x</span>
						<span className="eventNotifListItemMessage">Add {item.name}?</span>
						<span className="notifButton eventNotifListItemAccept" onClick={() => {
							var query = "UPDATE Invites SET isPending=0 WHERE id="+this.state.inviteList[index].id+";";
							DatabaseHelper(query).then((response) => {
								console.log(response);
								this.state.notificationList.splice(index, 1);
							});
						}}>✔</span>
					</div>
				</li>
			);
		});
		return(
			<div className="eventNotifOuterDiv">
				<ul className="eventNotifList">
					{items}
				</ul>
			</div>
		);
	}
}

export default EventPageLeaderInviteNotificationStack;