import React from 'react';
import s from './resources/css/homePage.css';
require("./resources/css/homePage.css");
class App extends React.Component {
	
	render() {
		var imgUrl = './resources/images/background.png';
	    return (
	    	<div className="divStyle">
	    		<div className="innerStyle">
	    			<div className="inner">Welcome!</div>
	    			<div className="inner">*LOGO*</div>
	    			<div className="inner">
		    			<div className="inner signIn signUpIn">Sign In</div>
		    			<div className="inner signUp signUpIn">Sign Up</div>
	    			</div>
	    		</div>
	    	</div>
	    );
	}
}

export default App;