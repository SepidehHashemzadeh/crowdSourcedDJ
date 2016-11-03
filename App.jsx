import React from 'react';
import FBLogin from './components/FBLogin.jsx'
require("./resources/css/homePage.css");
class App extends React.Component {

	render() {
		var imgUrl = require('./resources/images/logov4.png');

	    return (
	    	<div className="homePageDiv">
	    		<div className="homePageColumn">
	    			<div className="homePageRow" id="homePageWelcome">dj.que</div>
	    			<div className="homePageRow"><img src={imgUrl} id="logoHomePage"></img></div>
	    			{/*<div className="homePageRow" id="signBtnDiv">
		    			<div className="homePageRow signInBtn hvr-back-pulse signUpInBtn">Sign In</div>
		    			<div className="homePageRow signUpBtn hvr-back-pulse signUpInBtn">Sign Up</div>
	    			</div>*/}
	    			<div className="homePageRow" id="signBtnDiv"><FBLogin/></div>
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
