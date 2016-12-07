import React from 'react';
import { Alert } from 'reactstrap';
import $ from 'jquery'
export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }
        $('#message').show()
        $('#message').fadeOut(5000,function () {
            $( this ).hide()
        })
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
