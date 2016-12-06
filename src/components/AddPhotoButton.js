import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import $ from 'jquery'
import UserController from '../controllers/UserController'
import ViewManager from '../controllers/ViewManager';

class AddPhotoButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
        this.onAddPictureSuccess = this.onAddPictureSuccess.bind(this);
    }

    addPhoto(e) {
        // e.preventDefault();
        console.log('choose picture');
        let picUrl = ($('#photoUrl').val());
        if (!picUrl.includes('http')) {
            picUrl = 'https://' + picUrl;
        }

        console.log(picUrl);
        let description=$('#description').val();


        UserController.addPicture(picUrl, description, this.onAddPictureSuccess);

        this.toggle()

    }

    onAddPictureSuccess(response){
        console.log(response);

        let newPhoto = {
            id: response._id,
            original: response.imageUrl,
            description: response.description,
            thumbnail: response.imageUrl,
        };
        this.props.pictures.push(newPhoto);

        console.log(newPhoto);

        ViewManager.renderMessage('Picture successfully added.', 'success');
        console.log('Picture added');
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        // this.hideDefaultChoosing()


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
                    <ModalBody >
                        {/*<Button outline color="primary" style={{"backgroundColor":"#337ab7","color":"white"}} onClick={this.addPhoto}>CHOOSE PICTURE</Button>*/}

                        <Input type="email" name="file" id="photoUrl" placeholder="Enter url https://"/>

                        <Input type="textArea" id="description" placeholder="Put some description">

                        </Input>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" id="addPhoto" onClick={this.addPhoto}>ADD PHOTO</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddPhotoButton;