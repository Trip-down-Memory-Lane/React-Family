import kinveyRequester from '../services/KinveyRequester';
import React from 'react';
import Navigator from '../utils/navigation';
import Path from '../constants/constant';
import ViewManager from './ViewManager';

class UserController {

    static login(username, password) {
        kinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            console.log('login success');
            UserController.saveAuthInSession(userInfo);

            if (sessionStorage.getItem('firstTimeLogin')){
                sessionStorage.removeItem('firstTimeLogin');
                Navigator.navigate(Path.editProfileView());
                ViewManager.renderSuccessMessage('Login successful.');
            }
            else{
                Navigator.navigate(Path.profileView());
                ViewManager.renderSuccessMessage('Login successful.');
            }
        }
    }

    static register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            // TODO error message
            alert("Passwords don't match.");
        }
        // else will be removed after rendering the error message
        else {
            kinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this));
                // TODO catch error message

            function registerSuccess() {
                UserController.saveFirstTimeLogin();
                Navigator.navigate(Path.loginView());
            }
        }
    }

    static saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }

    static saveFirstTimeLogin(){
        sessionStorage.setItem('firstTimeLogin', true);
    }
}

export default  UserController;
