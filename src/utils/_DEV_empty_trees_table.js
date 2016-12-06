import credentials from "../constants/credentials";
import authenticator from "../utils/authentication";
import $ from "jquery";

function getTrees() {
    let method = `GET`;
    let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees`;
    let headers = authenticator.getKinveyUserAuthHeaders();

    $.ajax({method, url, headers})
        .then(empty)
}

function empty(response) {
    for (let tree of response) {
        let method = `DELETE`;
        let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees/${tree._id}`;
        let headers = authenticator.getKinveyUserAuthHeaders();

        $.ajax({method, url, headers});
    }
}

export default getTrees();
 
