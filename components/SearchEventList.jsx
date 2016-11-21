import React from 'react';
import SearchEventListItem from './SearchEventListItem.jsx';

import DatabaseHelper from '../databaseShortcuts.js';

class SearchEventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		};
		this.searchEvents = this.searchEvents.bind(this);
	}

	searchEvents(searchStr) {
		var query = "SELECT * FROM Events;";

		DatabaseHelper(query).then((res) => {
						this.setState({events: res});
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
				arr.push(
					<SearchEventListItem eventInfo={item} key={key} user={this.props.user}/>
				);
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