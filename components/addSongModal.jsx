import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalBody } from 'reactstrap';

var yt = require("../youtube.js");

class AddSongModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            id: props.id
        }
        this.toggle = this.toggle.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
    }

    toggle() {
        // can only open once?
        this.setState({
            modal: !this.state.modal
        });
    }

    addToQueue(event) {
        var songId = event.target["id"];
        console.log(songId);
        yt.addToPlaylist(this.props.eventId, songId, (res) => {
            console.log(res);
        });

        this.toggle();
    }

    render() {
        return <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>
                Add song to queue?
                <br/><br/>
                <Button onClick={this.addToQueue} id={this.state.id}>Add</Button>
                <Button onClick={this.toggle}>Cancel</Button>
            </ModalBody>
            </Modal>
    }

}

export default AddSongModal;