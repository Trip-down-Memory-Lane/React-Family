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
            url: credentials.baseUrl + "user/" + credentials.appKey + "/",
            headers: credentials.kinveyAppAuthHeaders,
            data: data,
        });
    }

    static getUserInfo(userId){
        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/" + userId,
            headers: Authenticator.getKinveyAuthHeaders()
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
            headers: Authenticator.getKinveyAuthHeaders(),
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
        //console.log('IN KINVEY');
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

    static resetPasswordRequest(email){
        //https://baas.kinvey.com/rpc/kid_SkHaVTqGx/redelcheva@gmail.com/user-password-reset-initiate

        let url = credentials.baseUrl + 'rpc/' + credentials.appKey + '/' + email + '/user-password-reset-initiate';

        return $.ajax({
            method: "POST",
            url: url,
            headers: credentials.kinveyAppAuthHeaders
        });
    }

    static searchUserRequest(firstName, lastName){
        //https://baas.kinvey.com/user/kid_SkHaVTqGx?query={"firstName":"Petyo"}|{"lastName": "Petrov"}

        let url = credentials.baseUrl + 'user/' + credentials.appKey + `?query={"firstName":"${firstName}"}
                                                                            |{"lastName":"${lastName}"}
                                                                            |{"firstName":"${lastName}"}
                                                                            |{"lastName":"${firstName}"}`;

        return $.ajax({
            method: "GET",
            url: url,
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }

    static fillSearchResultsRequest(results){
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/searchResults',
            headers: Authenticator.getKinveyAuthHeaders(),
            data: {results}
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

        // {"key":"value"}

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

    /*
    * PUTs the new parentRoot, containing the whole family-tree inside {userId}/treeRoot
    * TODO: in later stages if we implement search on user registration, another request must be sent to separate collection for the unregistered newRoot.
    * */
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

