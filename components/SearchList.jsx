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

		let key=0;
		this.state.events.map((item) => {
			key++;
			arr.push(
				<SearchListItem eventInfo={item} key={key} />
			);
		});
		return arr;

  }

  render() {
  	return(
			<div>
			    <ul>
						{this.searchEvents(this.props.searchStr)}
					</ul>
		   </div>
		);
	}
}

export default SearchList;