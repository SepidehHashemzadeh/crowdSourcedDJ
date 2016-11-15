import React from 'react';
import SearchListItem from './SearchListItem.jsx';

import DatabaseHelper from '../databaseShortcuts.js';

class SearchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		};
		this.searchEvents = this.searchEvents.bind(this);
	}

	searchEvents(searchStr) {
		var query = "SELECT * FROM Events WHERE name='" + searchStr + "';";

		DatabaseHelper(query).then((res) => {
						this.setState({events: res});
		});

		var arr = [];
		if(this.state.events.length > 0) {
			let key=0;
			this.state.events.map((item) => {
				key++;
				arr.push(
					<SearchListItem eventInfo={item} key={key} />
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
			    <ul style={{ width: "300px", paddingRight: "1.4%", marginTop: "7px" }}>
					{this.searchEvents(this.props.searchStr)}
				</ul>
		   </div>
		);
	}
}

export default SearchList;