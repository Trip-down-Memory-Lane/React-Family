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

    static addPicture(pictureUrl, userId){
        return $.ajax(({
            method: "POST",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + "/pictures",
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: {imageUrl: pictureUrl, userID: userId}
        }));
    }

    static getUserPictures(userId){
        return $.ajax({
            method: "GET",
            url: credentials.baseUrl + 'appdata/' + credentials.appKey + '/pictures?userID=' + userId,
            headers: Authenticator.getKinveyUserAuthHeaders()
        });
    }


    /*
    * PUTs the new parentRoot, containing the whole family-tree inside {userId}/treeRoot
    * TODO: in later stages if we implement search on user registration, another request must be sent to separate collection for the unregistered newRoot.
    * */
    static addNewRootToUser(prevRoot, newRoot) {
        let newTreeRoot = {
            name: newRoot.name,
            spouse: newRoot.spouse,
            children: prevRoot
        };
        let data = {
            name: prevRoot.name,
            spouse: prevRoot.spouse,
            children: prevRoot.children,
            treeRoot: newTreeRoot
        };

        return $.ajax({
            method: "PUT",
            url: credentials.baseUrl + `user/${credentials.appKey}/${sessionStorage.getItem(`id`)}`,
            headers: Authenticator.getKinveyUserAuthHeaders(),
            data: JSON.stringify(data)
        });
    } 

}

export default KinveyRequester;
