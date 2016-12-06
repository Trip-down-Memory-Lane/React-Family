import KinveyRequester from '../services/KinveyRequester';
import Path from '../constants/constant';
import {browserHistory} from 'react-router';
import ViewManager from './ViewManager';
import isEmail from '../../node_modules/validator/lib/isEmail';


class UserController {

    static login(username, password) {
        KinveyRequester
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
                browserHistory.push('home/profile');
                ViewManager.renderMessage('Login successful.', 'success');
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

            function registerSuccess() {
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

    static addPicture(pictureUrl) {

        KinveyRequester.addPictureRequest(pictureUrl)
            .then(addPictureSuccess.bind(this))
            .catch();

        function addPictureSuccess() {
            ViewManager.renderMessage('Picture successfully added.', 'success');
            console.log('Picture added');
        }
    }

    static loadUserPictures(userId, callback) {

        KinveyRequester.getUserPicturesRequest(userId)
            .then(callback);


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

    static editUser(userId, email, firstName, lastName, basicInfo, treeId, callback){

        if (!isEmail(email)){
            ViewManager.renderMessage('Invalid email address.', 'error');
            return;
        }

        firstName = UserController.capitalize(firstName);
        lastName = UserController.capitalize(lastName);

        KinveyRequester.editUserInfo(userId, email, firstName, lastName, basicInfo, treeId)
            .then(callback);
    }

    static capitalize(word){
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    static saveAuthInSession(userInfo) {
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
        let [firstName, lastName] = searchData.split(' ');

        firstName = UserController.capitalize(firstName);
        lastName = UserController.capitalize(lastName);

        KinveyRequester.searchUserRequest(firstName, lastName)
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
}

export default  UserController;
