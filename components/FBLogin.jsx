import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
var url = 'https://djque.herokuapp.com/?query=';
require("./../resources/css/homePage.css");
const responseFacebook = (response) => {
	//TODO: CLEANUP
	var name = response.name;
	var email = response.email;
	var id = response.id;
	var accessToken = response.accessToken;
	var query = "INSERT INTO Users VALUES (";
    query += id + ", '";
    query += name + "', '";
    query += email + "');";
	fetch(encodeURI(url + query)).then((res) => {
        return res.json();
    }).then((res) => {
        console.log(res);
    });
};
class FBLogin extends React.Component {
	render() {
	    return (
	    	<div className="signInFormDiv">
	    		<FacebookLogin
				appId="1124524594303257"
				autoLoad={true}
				fields="name,email,picture"
				cssClass="homePageRow hvr-back-pulse signUpInBtn" 
				callback={responseFacebook} />
				{/*onClick={componentClicked}*/}
	    	</div>
	    );
	}
}

export default FBLogin;
