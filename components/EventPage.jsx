import React from 'react';
import ReactDOM from 'react-dom';
import YoutubePlayer from 'react-youtube-player';

require("./../resources/css/eventPage.css");
var yt = require("./../youtube.js");

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        yt.search(this.state.value, (res) => {
            //console.log(res[0]);
        });
    }

    render() {
        return (
            <div>
                <input type="text"
                 name="searchInput"
                 value={this.state.value}
                 onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Search</button>
            </div>
        );
    }
}

export default EventPage;
