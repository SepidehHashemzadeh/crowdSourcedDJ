import React from 'react';
import SearchEventListItem from './SearchEventListItem.jsx';

import DatabaseHelper from '../databaseShortcuts.js';

class SearchEventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			invites: []
		};
		this.searchEvents = this.searchEvents.bind(this);
	}

	searchEvents(searchStr) {
		var query = "SELECT * FROM Events;";
		var query2 = "SELECT * FROM Invites WHERE fromId='"+this.props.user.id+"';"

		DatabaseHelper(query).then((res) => {
			this.setState({events: res});
		});

		DatabaseHelper(query2).then((res) => {
			this.setState({invites: res});
		});

		var arr = [];

		if(this.state.events.length > 0) {

			var matchedEvents = [];

			for (var i = 0; i < this.state.events.length; i++) {
				if(~this.state.events[i].name.indexOf(searchStr)) {
					matchedEvents.push(this.state.events[i]);
				}
			};

			let key=0;
			matchedEvents.map((item) => {
				key++;
				if (this.state.invites.length > 0) {
					arr.push(
						<SearchEventListItem eventInfo={item} key={key} user={this.props.user} invites={this.state.invites}/>
					);
				} else {
					arr.push(
						<SearchEventListItem eventInfo={item} key={key} user={this.props.user} invites={[]}/>
					);
				}
			});
		}
		else if(searchStr.length>0) {
			arr.push(
				<li className="eventSearchLoadingItem" key={0}>
					<div className="eventSearchLoadingDiv hvr-back-pulse2">
						<div className="loader"></div>
					</div>
				</li>
			);
		}
		return arr;
	}

  	render() {
  		return(
			<div>
				{this.props.searchStr.length>0?
			    <ul style={{ width: "300px", paddingRight: "1.4%", marginTop: "6px" }}>
					{this.searchEvents(this.props.searchStr)}
				</ul>
				: null}
		   </div>
		);
	}
}

export default SearchEventList;