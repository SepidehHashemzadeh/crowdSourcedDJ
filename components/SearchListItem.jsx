import React from 'react';

class SearchListItem extends React.Component {
	
	constructor(props) {
		super(props);
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
				<li>
					<div>
						<p>{this.props.eventInfo.name}</p>
					</div>
				</li>
			);
	}
	}

	render() {
		return (this.getEventDiv());
	}
}

export default SearchListItem;