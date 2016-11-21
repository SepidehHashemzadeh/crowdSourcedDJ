import React from 'react';

import DatabaseHelper from '../databaseShortcuts.js';
require("./../resources/css/searchEvent.css");
class SearchEventListItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.createRequest = this.createRequest.bind(this);
	}

	getEventDiv() {
		if(typeof this.props.eventInfo === "undefined")
		{
			return (<li>
								<div>
								</div>
							</li>
			);
		}
		else {
			return(
				<li className="eventSearchLoadingItem">
					<div className="eventSearchLoadingDiv hvr-back-pulse2">
						<p>{this.props.eventInfo.name}</p>
						<span className="button-create btn btn-danger joinEventButton" onClick={this.createRequest}>Join</span>
					</div>
				</li>
			);
	}
	}

	render() {
		return (this.getEventDiv());
	}

	createRequest() {

		var fromId = this.props.user.id;
		var toId = this.props.eventInfo.userId;
		var eventId = this.props.eventInfo.id;

		var query = "INSERT INTO Invites (fromId, toId, isRequest, eventId, isPending) VALUES ('";
		query +=  fromId + "', '";
		query += toId + "', '";
		query += "1" + "', '";
		query += eventId + "', '";
		query += "1'); ";

		DatabaseHelper(query).then((res) => {
			//console.log(res);
		});

	}

}

export default SearchEventListItem;