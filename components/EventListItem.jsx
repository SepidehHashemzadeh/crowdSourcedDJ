import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
import { formatDateTime } from '../timeConverter.js';
var url = 'https://djque.herokuapp.com/?query=';
require("../resources/css/eventList.css");
class EventListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pClass: "pNotHovered",
			divClass: "divNotHovered"
		};
		this.getEventDiv = this.getEventDiv.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.render = this.render.bind(this);
		this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
		this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
	}
	componentWillMount() {
		this.props.userInfo.then((response) => {
			this.setState({ userInfo: response[0] });
		});
	}
	handleOnMouseEnter() {
		this.setState({
			pClass: "pHovered",
			divClass: "divHovered"
		});
	}
	handleOnMouseLeave() {
		this.setState({
			pClass: "pNotHovered",
			divClass: "divNotHovered"
		});
	}
	handleClick() {
		this.props.handleClick(this.props.eventInfo.id, this.state.userInfo.id);
	}
	getEventDiv(){
		if(typeof this.state.userInfo === "undefined")
		{
			return (<li>
						<div className={this.state.divClass+" hvr-back-pulse2"}>
							<div className="loader"></div>
						</div>
					</li>);					
		}
		else {
			return (<li>
						<div onClick={this.handleClick} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} className={this.state.divClass+" hvr-back-pulse2"}>
							<p className="alwaysShown"> What: {this.props.eventInfo.name} </p>
							<p className="alwaysShown"> When: { formatDateTime(this.props.eventInfo.startTime.toString()) } </p>
							<p className="alwaysShown"> Where: {this.props.eventInfo.location} </p>
							<br/>
							<div className={this.state.pClass}>
								<p> Who: {this.state.userInfo.name} </p>
								<p> Why: {this.props.eventInfo.description} </p>
							</div>
						</div>
					</li>);
		}
	}
	render() {
		return (this.getEventDiv());
	}
}

export default EventListItem;