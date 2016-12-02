import React from 'react';
import { Alert } from 'reactstrap';

class InfoMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }
    }

    onDismiss = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>{this.props.message}</Alert>
        );
    }
}

export default InfoMessage;
