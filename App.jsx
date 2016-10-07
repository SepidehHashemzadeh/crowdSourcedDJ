import React from 'react';

class App extends React.Component {
	
	render() {
		var imgUrl = './resources/images/background.png';
		var divStyle = {
  			backgroundColor: 'black',
  			width: '100vw',
  			height: '100vh'
		};
	    return (
	    	<div style={divStyle}>
	    		Hello World!
	    	</div>
	    );
	}
}

export default App;