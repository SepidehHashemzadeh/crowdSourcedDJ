import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'reactstrap';
require("../resources/css/tabs.css");

class ControlledTabs extends React.Component {
	constructor(props) {
		super(props);
		if(props.tabCurrKey === 1) {
	    	this.state = {
				key: props.tabCurrKey,
				myChecked: true,
				othersChecked: false
			};
		}
		else {
	    	this.state = {
				key: props.tabCurrKey,
				myChecked: false,
				othersChecked: true
			};
		}
		this.handleSelect1 = this.handleSelect1.bind(this);
		this.handleSelect2 = this.handleSelect2.bind(this);
	}
	componentWillReceiveProps(newProps) {
		if(newProps.tabCurrKey === 1) {
	    	this.state = {
				key: newProps.tabCurrKey,
				myChecked: true,
				othersChecked: false
			};
		}
		else {
	    	this.state = {
				key: newProps.tabCurrKey,
				myChecked: false,
				othersChecked: true
			};
		}
	}
	handleSelect1() {
    	this.props.handleSelect(1);
    	document.getElementById("c-tab-6").checked = true;
    	document.getElementById("c-tab-7").checked = false;
  	}
  	handleSelect2() {
    	this.props.handleSelect(2);
    	document.getElementById("c-tab-6").checked = false;
    	document.getElementById("c-tab-7").checked = true;
  	}
	render() {
		var cursorStyle = {
			cursor: "pointer"
		};
		return(
			<div id="tabsOuterDiv" className="c-tabs">
			    <input  id="c-tab-6" name="c-tabs-2" type="radio" onChange={this.handleSelect1} checked={this.state.myChecked}/>
				<label style={cursorStyle} htmlFor="c-tab-6">My Events</label>
				<input  id="c-tab-7" name="c-tabs-2" type="radio" onChange={this.handleSelect2} checked={this.state.othersChecked}/>
				<label style={cursorStyle} htmlFor="c-tab-7">Other Events</label>
		    </div>
		);
	}
}

export default ControlledTabs;