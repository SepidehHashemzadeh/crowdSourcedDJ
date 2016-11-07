import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
var url = 'https://djque.herokuapp.com/?query=';
require("./../resources/css/homePage.css");
class FBLogin extends React.Component {
	constructor(props) {
		super(props);
		this.responseFacebook = this.responseFacebook.bind(this);
	}
	responseFacebook(response) {
		console.log(response);
		if(!(typeof response.id === "undefined")) {
			var name = response.name;
			var email = response.email;
			var id = response.id;
			var accessToken = response.accessToken;
			var user = {
				name: name,
				email: email,
				id: id,
				accessToken: accessToken
			};
			var query = "INSERT INTO Users VALUES (";
			query += id + ", '";
			query += name + "', '";
			query += email + "');";
			fetch(encodeURI(url + query)).then((res) => {
			    return res.json();
			}).then((res) => {
				this.props.onLogin(user);
			});
		}
	};
	render() {
	    return (
	    	<div className="signInFormDiv">
	    		<FacebookLogin
				appId="1124524594303257"
				autoLoad={true}
				scope="public_profile, email, user_birthday"
				fields="name,email,picture"
				cssClass="homePageRow hvr-back-pulse signUpInBtn" 
				callback={this.responseFacebook} />
	    	</div>
	    );
	}
}

export default FBLogin;
