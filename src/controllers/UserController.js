import KinveyRequester from '../services/KinveyRequester';
import Path from '../constants/constant';
import {browserHistory} from 'react-router';
import ViewManager from './ViewManager';
import isEmail from '../../node_modules/validator/lib/isEmail';
import $ from 'jquery'

class UserController {

    static login(username, password) {
        KinveyRequester
            .loginUser(username, password)
            .then(loginSuccess.bind(this)).catch(function () {
            ViewManager.renderMessage('Please fill correctly all fields', 'success');
            $('#message').show();
            $('#message').fadeOut(5000,function () {
                $( this ).hide()
            })
        });

        function loginSuccess(userInfo) {
            console.log('login success');
            UserController.saveAuthInSession(userInfo);

            if (sessionStorage.getItem('firstTimeLogin')) {
                sessionStorage.removeItem('firstTimeLogin');

                UserController.addPicture('loginHelper/img/backgrounds/11.jpg');
                UserController.addPicture('loginHelper/img/backgrounds/22.jpg');
                UserController.addPicture('loginHelper/img/backgrounds/image2.jpg');

                browserHistory.push('/home/edit');
                ViewManager.renderMessage('Login successful.', 'success');
                $('#message').show()
                $('#message').fadeOut(5000,function () {
                    $( this ).hide()
                })
            }
            else {
                let userId = sessionStorage.getItem('userId');
                browserHistory.push('/advert');
                ViewManager.renderMessage('Login successful.', 'success');
                $('#message').show()
                $('#message').fadeOut(5000,function () {
                    $( this ).hide()
                })
            }
        }
    }

    static register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            ViewManager.renderMessage('Passwords do not match.', 'error');
        }
        else {
            KinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this))
                .catch(ViewManager.renderMessage('Registration failed.', 'error'));

            function registerSuccess(success) {
                UserController.saveFirstTimeLogin();
                browserHistory.push(Path.loginView());
                ViewManager.renderMessage('Thank yoy for your registration. Please login to proceed.', 'success');
            }
        }
    }

    static logout() {
        KinveyRequester.logoutUser()
            .then(logoutSuccess.bind(this));

        function logoutSuccess() {
            sessionStorage.clear();
            browserHistory.push(Path.loginView());
        }
    }

    static passwordCheck(password, callback){
        let username = sessionStorage.getItem('username');

        KinveyRequester.loginUser(username, password)
            .then(callback);
    }

    static resetPassword(email, callback){
        KinveyRequester.resetPasswordRequest(email)
            .then(callback);
    }

    static addPicture(pictureUrl, description, callback) {

        KinveyRequester.addPictureRequest(pictureUrl, description)
            .then(callback)
            .catch();
    }

    static loadUserPictures(userId, callback) {
        KinveyRequester.getUserPicturesRequest(userId)
            .then(callback).catch(function (err) {
            console.log('ERROR');
            console.log(err);
        });


        // console.log('AAAAAAAAA');
        // //let userId = sessionStorage.getItem('userId');
        //
        // let userPictures = KinveyRequester.getUserPictures(userId);
        // console.log('BBBBBBBBBBBB');
        // let picturesUrls = [];
        // for (let i = 0; i < userPictures.length; i++) {
        //     picturesUrls.push(userPictures[i])
        // }
        //
        // console.log('CCCCCCCCCCCCC');
        // return picturesUrls;
    }

    static loadUserInfo(userId, callback){
        KinveyRequester.getUserInfo(userId)
            .then(callback);
    }

    static editUser(userId, userInfo, callback) {
        if (!isEmail(userInfo.email)){
            console.log(userInfo.email);
            ViewManager.renderMessage('Invalid email address.', 'error');
            return;
        }

        userInfo.firstName = UserController.capitalize(userInfo.firstName);
        userInfo.lastName = UserController.capitalize(userInfo.lastName);

        KinveyRequester.editUserInfo(userId, userInfo)
            .then(callback);
    }

    static capitalize(word){
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    static saveAuthInSession(userInfo) {
        console.log(userInfo._kmd.authtoken);
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }

    static saveFirstTimeLogin() {
        sessionStorage.setItem('firstTimeLogin', true);
    }

    // static loadUsers(callback){
    //     KinveyRequester.getAllUsers()
    //         .then(callback);
    // }

    static loadUsers(callback){
        KinveyRequester.getSearchResultUsers()
            .then(callback);
    }

    static searchUser(searchData, callback){
        searchData = searchData.split(/\s+/);

        let tokens = [];
        for (let token of searchData){
            token = UserController.capitalize(token);
            tokens.push(token);
        }

        KinveyRequester.searchUserRequest(tokens)
            .then(callback);
    }

    static fillSearchResults(searchResults, callback){
        KinveyRequester.fillSearchResultsRequest(searchResults)
            .then(callback);
    }

    static deleteSearchData(searchId, callback){
        KinveyRequester.deleteSearchDataRequest(searchId)
            .then(callback);
    }

    static deletePictures(toBeDeleted, callback){

        for (let pic of toBeDeleted){
            KinveyRequester.deletePictureRequest(pic)
                .then((pic, response) => callback(pic, response));
        }

        KinveyRequester.deletePictureRequest(toBeDeleted)
            .then((deleted, response) => callback(toBeDeleted, response));
    }
}

export default UserController;
