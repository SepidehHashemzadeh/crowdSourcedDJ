import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
require("./../resources/css/homePage.css");
class FBLogin extends React.Component {
	render() {
	    return (
	    	<div className="signInFormDiv">
	    		<FacebookLogin
				appId="1124524594303257"
				autoLoad={true}
				fields="name,email,picture"
				cssClass="homePageRow hvr-back-pulse signUpInBtn" />
				{/*onClick={componentClicked}
				callback={responseFacebook}*/}
	    	</div>
	    );
	}
}

export default FBLogin;