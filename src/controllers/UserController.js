import kinveyRequester from '../services/KinveyRequester';
import authenticator from '../utils/authentication';
import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../views/LoginView';
import navigator from '../utils/navigation';
import Path from '../constants/constant';

class UserController {

    login(username, password) {
        kinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            console.log('login success');

            UserController.saveAuthInSession(userInfo);
            /**
             * ToDO if checking for first time logging , else profile view
             */
                navigator.navigate(Path.editProfileView());

            // Will navigate to profile page view
            // navigator.navigate(Path.profileView());
        }
    }

    register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            // TODO error message
            alert("Passwords don't match.");
        }
        // else will be removed after rendering the error message
        else {
            kinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this));
                // TODO catch error message

            function registerSuccess(userInfo) {
                UserController.saveAuthInSession(userInfo);
                navigator.navigate(Path.loginView());
            }
        }
    }

    static saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }
}

let userController = new UserController();
export default  userController;
