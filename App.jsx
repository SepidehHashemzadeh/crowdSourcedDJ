import React from 'react';
import FBLogin from './components/FBLogin.jsx'
require("./resources/css/homePage.css");
class App extends React.Component {
	constructor(props) {
		super();
		this.moveUp = this.moveUp.bind(this);
		this.state = {
			FBLoginClass: "signBtnDiv",
			LogoId: ""
		};
	}
	moveUp() {
		this.setState({
			FBLoginClass: "displayNone",
			LogoId: "moveLogoUp"
		});
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


var MyComponentClass = React.createClass({
  render: function () {
    return <h1>Hello world</h1>;
  }
});

export default App;
