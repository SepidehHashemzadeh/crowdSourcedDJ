import React from 'react';
import FBLogin from './components/FBLogin.jsx'
import CreateEventForm from './components/CreateEventForm.jsx'
require("./resources/css/homePage.css");
require("./resources/css/dashboard.css");

class App extends React.Component {
	constructor(props) {
		super();
		this.moveUp = this.moveUp.bind(this);
		this.state = {
			FBLoginClass: "signBtnDiv",
			LogoId: ""
		};
	}
	moveUp(user) {
		debugger;
		this.setState({
			FBLoginClass: "displayNone",
			LogoId: "moveLogoUp",
			user: user
		});
		
		document.getElementById("userInfo").value = JSON.stringify(user);
		document.getElementById("dashboard").style.display = "block";
		document.getElementById("app").style.height = "23vh";
	}
	render() {
		var imgUrl = require('./resources/images/logov4.png');
	    return (
	    	<div className="homePageDiv">
	    		<div className="homePageColumn" id={this.state.LogoId}>
	    			<div className="homePageRow" id="homePageWelcome">dj.que</div>
	    			<div className="homePageRow"><img src={imgUrl} id="logoHomePage"></img></div>
	    			<div className="homePageRow" id={this.state.FBLoginClass}><FBLogin onLogin={this.moveUp} /></div>
	    		</div>
	    	</div>
	    );
	}
}

export default App;