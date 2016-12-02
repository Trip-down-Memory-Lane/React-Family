import $ from 'jquery';
import credentials from '../constants/credentials';
import authenticator from '../utils/authentication';

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
            headers: authenticator.getKinveyUserAuthHeaders()
        });
    }

    static logoutUser() {
        return $.ajax({
            method: "POST",
            url: credentials.baseUrl + "user/" + credentials.appKey + "/_logout",
            headers: authenticator.getKinveyUserAuthHeaders(),
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
            headers: authenticator.getKinveyUserAuthHeaders(),
            data: JSON.stringify(data)
        });
    } 

}

export default KinveyRequester;
