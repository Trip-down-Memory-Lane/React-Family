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

        let data = {
            username: username,
            password: password,
            profilePicture: "http://www.clipartbest.com/cliparts/9Tp/ona/9Tponakbc.png",
        };

        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + "user/" + credentials.appKey,
            headers: credentials.kinveyAppAuthHeaders,
            data: data,
        });
    }

    static getUserInfo(userId){

        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/" + userId,
            headers: Authenticator.getKinveyUserAuthHeaders()
        })
    }

    static editUserInfo(userId, userInfo){
        let data = {
            username: sessionStorage.getItem('username'),
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            basicInfo: userInfo.basicInfo,
            treeId: userInfo.treeId,
            profilePicture: userInfo.profilePicture,
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
            headers: Authenticator.getKinveyUserAuthHeaders(),
        });
    }

    static addPictureRequest(pictureUrl, description){
        return $.ajax(({
            method: "POST",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + "/pictures",
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: {imageUrl: pictureUrl, description: description}
        }));
    }

    static getUserPicturesRequest(userId){
        let query = `?query={"_acl":{"creator":"${userId}"}}`;

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

    static resetPasswordRequest(email){

        let url = credentials.baseUrl + 'rpc/' + credentials.appKey + '/' + email + '/user-password-reset-initiate';

        return $.ajax({
            method: "POST",
            url: url,
            headers: credentials.kinveyAppAuthHeaders
        });
    }

    static searchUserRequest(names){


        let tokens = [];

        let tmpName;
        for (let name of names){
            tmpName = `{"firstName":"${name}"}`;
            tokens.push(tmpName);
            tmpName = `{"lastName":"${name}"}`;
            tokens.push(tmpName);
        }

        tokens = tokens.join(',');

        let urlRequest = credentials.baseUrl + 'user/' + credentials.appKey + `?query={"$or":[${tokens}]}`;

        return $.ajax({
            method: "GET",
            url: urlRequest,
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }

    static fillSearchResultsRequest(results){
        let data = {results: results};
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/searchResults',
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: data,
        });
    }

    static getSearchResultUsers(){
        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/searchResults',
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }

    static deleteSearchDataRequest(searchId){
        return $.ajax({
            method: "DELETE",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/searchResults/' + searchId,
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }

    static deletePictureRequest(toBeDeleted){

        let query = '?query=';
        for (let pic of toBeDeleted){
            query += `{"_id":"${pic}"}|`;
        }

        query = query.substr(0, query.length - 1);

        let requestUrl = credentials.baseUrl + 'appdata/' + credentials.appKey + '/pictures' + query;

        return $.ajax({
            method: "DELETE",
            url: requestUrl,
            headers: Authenticator.getKinveyUserAuthHeaders(),
        })
    }


    static addParents(data) {
        return $.ajax({
            method: "PUT",
            url: credentials.baseUrl + `user/${credentials.appKey}/${sessionStorage.getItem(`id`)}`,
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: JSON.stringify(data)
        });
    }

    static addSiblings(data) {
        return $.ajax({
            method: `PUT`,
            url: credentials.baseUrl + ``
        })

    }

}

export default KinveyRequester;

