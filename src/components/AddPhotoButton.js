import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import $ from 'jquery'

class AddPhotoButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
    }

    addPhoto() {
        console.log('choose picture');
        $('#addPhoto').click();
    }

    toggle() {

        this.setState({
            modal: !this.state.modal
        });
        this.hideDefaultChoosing()

    }

    hideDefaultChoosing() {
        let counter = 0;
        let timer = setInterval(function () {
            $('#inputt').hide()
            if (counter >= 75) {
                clearInterval(timer);
            }
            counter++;
        }, 100);
    }

    render() {
        return (
            <div>
                <Button style={{"fontSize": "20px"}} color="danger" onClick={this.toggle}> {this.props.buttonLabel}Add
                    more photos</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        <Button outline color="primary" style={{"backgroundColor":"#337ab7","color":"white"}} onClick={this.addPhoto}>CHOOSE PICTURE</Button>
                        <div id="inputt">
                            <Input type="file" name="file" id="addPhoto"/>

                        </div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>APPLY CHANGES</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddPhotoButton;