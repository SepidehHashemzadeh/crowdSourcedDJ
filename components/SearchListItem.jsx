import React from 'react';

class SearchListItem extends React.Component {
	
	constructor(props) {
		super(props);
	}

	getEventDiv() {
		return(
			<li>
				<div>
					<p>{this.props.eventInfo.name}</p>
				</div>
			</li>
		);
	}

	render() {
		return (this.getEventDiv());
	}
}

export default SearchListItem;