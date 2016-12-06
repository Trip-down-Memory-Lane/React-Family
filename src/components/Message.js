import React from 'react';
import { Alert } from 'reactstrap';

export default class Message extends React.Component {
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
            <Alert color={this.props.type} isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.message}
            </Alert>
        );
    }
}
