import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'reactstrap';
var url = 'https://djque.herokuapp.com/?query=';
require("../resources/css/eventList.css");

class EventListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pClass: "pNotHovered",
			divClass: "divNotHovered"
		};
		props.userInfo.then((response) => {
			console.log(response);
			this.setState({ userInfo: response[0] });
		});
		this.handleUserInfoResponse = this.handleUserInfoResponse.bind(this);
		this.getEventDiv = this.getEventDiv.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.render = this.render.bind(this);
		this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
		this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
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
		console.log(this.props.eventInfo.id);
	}
	handleUserInfoResponse(res) {
		this.setState({ userInfo: res[0] });
	}
	timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	}
	getEventDiv(){
		if(typeof this.state.userInfo === "undefined")
		{
			return (<li>
						<div className={this.state.divClass}>
							<div class="loader"></div>
						</div>
					</li>);
		}
		else {
			return (<li>
						<div onClick={this.handleClick} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} className={this.state.divClass}>
							<p className="alwaysShown"> What: {this.props.eventInfo.name} </p>
							<p className="alwaysShown"> When: {(new Date(this.props.eventInfo.startTime)).toLocaleString()} </p>
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