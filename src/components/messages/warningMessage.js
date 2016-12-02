import React from 'react';
import { Alert } from 'reactstrap';

class WarningMessage extends React.Component {
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
            <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.message}
            </Alert>
        );
    }
}

export default WarningMessage;
