import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount(){
        console.log('BEFORE RENDER')
    }
       //toDO

    render() {
        console.log('IME');
        console.log(this.props.name);
        return (
            <div>
                <Button style={{"fontSize":"20px"}} color="danger" onClick={this.toggle}>{this.props.name}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader style={{"paddingTop":"5%"}} toggle={this.toggle}>ABOUT ME</ModalHeader>
                    <ModalBody>
                        {this.props.basicInfo}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AboutMe;