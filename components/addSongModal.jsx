import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalBody } from 'reactstrap';

class AddSongModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            id: props.id
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        // can only open once?
        this.setState({
            modal: !this.state.modal
        });
    }

    addToQueue(event) {
        // send id to parent component?
        songId = event.target["id"];
    }

    render() {
        return <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>
                Add song to queue?
                <br/><br/>
                <button onClick={this.addToQueue} id={this.state.id}>Add</button>
                <button onClick={this.toggle}>Cancel</button>
            </ModalBody>
            </Modal>
    }

}

export default AddSongModal;
