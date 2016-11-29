import $ from 'jquery';
import consts from '../consts';
import Path from '../constants/constant'
const KinveyRequester = (function(){

    function loginUser(username, password) {
        return $.ajax({
                method: "POST",
                url: consts.baseUrl + "user/" + consts.appKey + "/login",
                headers: consts.kinveyAppAuthHeaders,
                data: { username, password }
            });
    }

    function registerUser(username, password) {
        return $.ajax({
                method: "POST",
                url: consts.baseUrl + "user/" + consts.appKey + "/",
                headers: consts.kinveyAppAuthHeaders,
                data: { username, password }
            });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': Path.database() + sessionStorage.getItem('authToken'),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: consts.baseUrl + "user/" + consts.appKey + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    }

    return { loginUser, registerUser, logoutUser }
})();

export default KinveyRequester;
