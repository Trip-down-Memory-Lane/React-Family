import kinveyRequester from '../services/KinveyRequester';
import Path from '../constants/constant';
import {browserHistory} from 'react-router';
import ViewManager from './ViewManager';

class UserController {

    static login(username, password) {
        kinveyRequester
            .loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            console.log('login success');
            UserController.saveAuthInSession(userInfo);

            if (sessionStorage.getItem('firstTimeLogin')){
                sessionStorage.removeItem('firstTimeLogin');
                browserHistory.push(Path.editProfileView());
                ViewManager.renderSuccessMessage('Login successful.');
            }
            else{
                browserHistory.push(Path.profileView());
                ViewManager.renderSuccessMessage('Login successful.');
            }
        }
    }

    static register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            ViewManager.renderErrorMessage('Passwords do not match.');
        }
        else {
            kinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this))
                .catch(ViewManager.renderErrorMessage('Registration failed.'));

            function registerSuccess() {
                UserController.saveFirstTimeLogin();
                browserHistory.push(Path.loginView());
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
