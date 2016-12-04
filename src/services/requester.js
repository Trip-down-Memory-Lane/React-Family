import $ from 'jquery';

const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_S1JjSvemx";
const appSecret = "f90e456e4d374409b1e92faca5cafcc8";

function get(module, url, auth) {
    let hostUrl = baseUrl + module + '/' + appKey + '/' + url;
    let header = makeHeader(auth);

    return $.ajax({
        method: "GET",
        url: hostUrl,
        headers: header
    });
}

function post(module, url, auth, data) {
    let hostUrl = baseUrl + module + '/' + appKey + '/' + url;
    let header = makeHeader(auth);

    let request = {
        method: "POST",
        url: hostUrl,
        headers: header,
    };

    if (data){
        request.data = data;
    }

    return $.ajax(request);
}

function update(module, url, auth, data) {
    let hostUrl = baseUrl + module + '/' + appKey + '/' + url;
    let header = makeHeader(auth);

    let request = {
        method: "PUT",
        url: hostUrl,
        headers: header,
        data: data,
    };


    return $.ajax(request);
}

function makeHeader(auth) {
    let header = {'Authorization': ''};

    switch (auth){
        case 'Basic': header['Authorization'] = "Basic " + btoa(appKey + ':' + appSecret); break;
        case 'Kinvey': header['Authorization'] = "Kinvey " + sessionStorage.getItem('authToken'); break;
        default: break;
    }

    return header;
}

export {get, post, update};
