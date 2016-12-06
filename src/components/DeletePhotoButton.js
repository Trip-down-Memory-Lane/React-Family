import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import $ from 'jquery'
import UserController from '../controllers/UserController'

class DeletePhotoButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            marked: []
        };

        this.toggle = this.toggle.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.markForDelete = this.markForDelete.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    }

    deletePhoto(e) {
        e.preventDefault();
        // console.log(this.state.marked);

        UserController.deletePictures(this.state.marked, this.onDeleteSuccess );

        this.toggle();
    }

    onDeleteSuccess(response){
        console.log('deleted');
    }

    toggle() {
        this.setState({
            marked: []
        });
        this.setState({
            modal: !this.state.modal
        });


    }


    markForDelete(e) {
        let id = (e.target.id);
        // console.log(id);
        this.state.marked.push(id);
        if ($(e.target).parent().children().length == 1) {
            ($(e.target).parent().append($('<div>MARKED</div>')));
        } else {
            $(e.target).parent().children().eq(1).remove();
            this.setState(
                {
                    marked: this.state.marked.filter(function (element) {
                        return element != id;
                    })
                })
        }


    }

    render() {
        return (
            <div>
                <Button id="deletePicture" style={{"fontSize": "20px"}} color="danger"
                        onClick={this.toggle}> {this.props.buttonLabel}Delete picture</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody >
                        {/*<Button outline color="primary" style={{"backgroundColor":"#337ab7","color":"white"}} onClick={this.deletePhoto}>CHOOSE PICTURE</Button>*/}

                        {/*{*/}
                        {/*for (let i = 0; i < this.props.pictures.length; i++) {*/}
                        {/*<img href={this.props.pictures[i]} key={i}/>*/}
                        {/*}*/}
                        {/*}*/}
                        <div>
                            {
                                this.props.pictures.map((p, i) => {
                                    let path=p.original;
                                    if (!p.original.startsWith('h')) {
                                       path='/'+path;
                                    }
                                    return (
                                        <div key={i} style={{"paddingRight": "70%"}}>
                                            <img style={{
                                                "width": "80px",
                                                "height": "80px",
                                                "border": "5px",
                                                'color': 'red',
                                                'margin': '4px'
                                            }}
                                                 onClick={this.markForDelete}
                                                 key={i}
                                                 id={p.id}

                                                 src={ path}
                                            />

                                        </div>
                                    );
                                })}
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" id="deletePhoto" onClick={this.deletePhoto}>DELETE PHOTO</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DeletePhotoButton;