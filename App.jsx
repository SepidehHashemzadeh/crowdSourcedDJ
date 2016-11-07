import React from 'react';
import FBLogin from './components/FBLogin.jsx'
import Dashboard from './components/Dashboard.jsx'
require("./resources/css/homePage.css");
require("./resources/css/dashboard.css");

class App extends React.Component {
	constructor(props) {
		super();
		this.moveUp = this.moveUp.bind(this);
		this.state = {
			FBLoginId: "signBtnDiv",
			LogoId: "",
			user: {},
			showDashboard: false
		};
	}
	moveUp(user) {
		this.setState({
			FBLoginId: "displayNone",
			LogoId: "moveLogoUp",
			user: user,
			showDashboard: true
		});
		document.body.style.overflowY = "scroll";
	}
	render() {
		var imgUrl = require('./resources/images/logov4.png');
	    return (
	    	<div id="appDiv">
		    	<div className="homePageDiv">
		    		<div className="homePageColumn" id={this.state.LogoId}>
		    			<div className="homePageRow" id="homePageWelcome">dj.que</div>
		    			<div className="homePageRow"><img src={imgUrl} id="logoHomePage"></img></div>
		    			{ !this.state.showDashboard ?
		           			<div className="homePageRow" id={this.state.FBLoginId}><FBLogin onLogin={this.moveUp} /></div> :
		           			null
        				}
		    		</div>
		    	</div>
		    	{this.state.showDashboard ?
		           <Dashboard user={this.state.user} /> :
		           null
        		}
	    	</div>
	    );
	}
}

export default App;