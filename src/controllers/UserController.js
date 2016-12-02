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

            if (sessionStorage.getItem('firstTimeLogin')) {
                sessionStorage.removeItem('firstTimeLogin');

                UserController.addPicture('loginHelper/img/backgrounds/11.jpg');
                UserController.addPicture('loginHelper/img/backgrounds/22.jpg');
                UserController.addPicture('loginHelper/img/backgrounds/image2.jpg');

                browserHistory.push(Path.editProfileView());
                ViewManager.renderMessage('Login successful.', 'success');
            }
            else {
                browserHistory.push(Path.profileView());
                ViewManager.renderMessage('Login successful.', 'success');
            }
        }
    }

    static register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            ViewManager.renderMessage('Passwords do not match.', 'error');
        }
        else {
            kinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this))
                .catch(ViewManager.renderMessage('Registration failed.', 'error'));

            function registerSuccess() {
                UserController.saveFirstTimeLogin();
                browserHistory.push(Path.loginView());
                ViewManager.renderMessage('Thank yoy for your registration. Please login to proceed.', 'success');
            }
        }
    }

    static logout() {
        kinveyRequester.logoutUser()
            .then(logoutSuccess.bind(this));

        function logoutSuccess() {
            sessionStorage.clear();
            browserHistory.push(Path.loginView());
        }
    }

    static addPicture(pictureUrl) {

        let userId = sessionStorage.getItem('userId');

        kinveyRequester.addPicture(pictureUrl, userId)
            .then(addPictureSuccess.bind(this))
            .catch();

        function addPictureSuccess() {
            ViewManager.renderMessage('Picture successfully added.', 'success');
            console.log('Picture added');
        }
    }

    static getUserPictures() {
        console.log('AAAAAAAAA');
        let userId = sessionStorage.getItem('userId');

        let userPictures = kinveyRequester.getUserPictures(userId);
        console.log('BBBBBBBBBBBB');
        let picturesUrls = [];
        for (let i = 0; i < userPictures.length; i++) {
            picturesUrls.push(userPictures[i])
        }

        console.log('CCCCCCCCCCCCC');
        return picturesUrls;
    }


    static saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }

    static saveFirstTimeLogin() {
        sessionStorage.setItem('firstTimeLogin', true);
    }
}

export default  UserController;
