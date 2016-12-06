import $ from 'jquery';
import credentials from '../constants/credentials';
import Authenticator from '../utils/authentication';

class KinveyRequester {

    static loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/login",
            headers: credentials.kinveyAppAuthHeaders,
            data: {username, password}
        });
    }

    static registerUser(username, password){
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/",
            headers: credentials.kinveyAppAuthHeaders,
            data: {username, password}
        });
    }

    static getUserInfo(userId){
        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/" + userId,
            headers: Authenticator.getKinveyAuthHeaders()
        })
    }

    static editUserInfo(userId, firstName, lastName, basicInfo){
        let data = {
            username: sessionStorage.getItem('username'),
            firstName: firstName,
            lastName: lastName,
            basicInfo: basicInfo
        };

        let url = credentials.baseUrl + 'user/' + credentials.appKey + '/' + userId;
        return $.ajax({
            method: "PUT",
            url: url,
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: data
        });
    }

    static logoutUser() {
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/_logout",
            headers: Authenticator.getKinveyAuthHeaders(),
        });
    }

    static addPictureRequest(pictureUrl){
        return $.ajax(({
            method: "POST",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + "/pictures",
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: {imageUrl: pictureUrl}
        }));
    }

    static getUserPicturesRequest(userId){
        let query = `?query={"_acl.creator":"${userId}"}`;

        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/pictures' + query,
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }

    static getAllUsers(){
        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + 'user/' + credentials.appKey,
            headers: Authenticator.getKinveyUserAuthHeaders()
        })
    }
}

export default KinveyRequester;
