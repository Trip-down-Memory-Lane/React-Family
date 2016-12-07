import {Component} from "react";
import $ from "jquery";

import credentials from "../constants/credentials";
import authentication from "../utils/authentication";

export default class TreeRequester extends Component {
    static getTree(treeId) {
        let method = `GET`;
        let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees/${treeId}`;
        let headers = authentication.getKinveyUserAuthHeaders();

        return $.ajax({method, url, headers});
    }

    static postNewTree(tree) {
        let method = `POST`;
        let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees/`;
        let headers = authentication.getKinveyUserAuthHeaders();
        let data = {tree};
        let request = {method, url, headers, data};
        return $.ajax(request);
    }

    static putNewRoot(tree) {
        let method = `PUT`;
        let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees/${tree.treeId}`;
        let headers = authentication.getKinveyUserAuthHeaders();
        let data = {tree};

        let request = {method, url, headers, data};
        return $.ajax(request);
    }

    static putNewChildren(tree) {
        let method = 'PUT';
        let url = credentials.baseUrl + `appdata/${credentials.appKey}/trees/${tree.treeId}`;
        let headers = authentication.getKinveyUserAuthHeaders();
        let data = {tree};

        let request = {method, url, headers, data};
        return $.ajax(request);
    }
}
 
