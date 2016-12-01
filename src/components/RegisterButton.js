import React, {Component} from "react";
import userController from '../controllers/UserController';
import {Button} from 'reactstrap';
import Path from '../constants/constant'
import {Link} from 'react-router';


class RegisterButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: Path.username,
            password: Path.password,
            confirmPassword: Path.confirmPassword
        };
    }

    handleRegister(event) {
        event.preventDefault();
        console.log('REGISTERING');
        userController.register(this.usernameField.value,
            this.passwordField.value, this.confirmPasswordField.value
        )
    }

    render() {
        return (
            <Link to="/register">
            <Button id="register"
                    color="primary"
                    className="btn"
                    onClick={() => this.handleRegister.bind(this)}>
                <div >REGISTER!</div >
            </Button>
            </Link>
        )
    }
}

export  default RegisterButton
