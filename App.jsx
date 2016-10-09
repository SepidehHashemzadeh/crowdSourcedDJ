import React from 'react';
require("./resources/css/homePage.css");
class App extends React.Component {
	
	render() {
		var imgUrl = require('./resources/images/logov4.png');
	    return (
	    	<div className="divStyle">
	    		<div className="innerStyle">
	    			<div className="inner" id="homePageWelcome">Welcome!</div>
	    			<div className="inner"><img src={imgUrl} id="logoHomePage"></img></div>
	    			<div className="inner" id="signDiv">
		    			<div className="inner signIn signUpIn">Sign In</div>
		    			<div className="inner signUp signUpIn">Sign Up</div>
	    			</div>
	    		</div>
	    	</div>
	    );
	}
}

export default App;