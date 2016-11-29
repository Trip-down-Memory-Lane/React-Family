 import React, {Component} from 'react';
 import $ from 'jquery'
 import ReactDOM from 'react-dom';
 import LoginView from '../views/LoginView'
 import Register from '../views/RegisterView'
 import login from './UserController';

function changeView(view, id) {
    let component;
    switch(view) {
        case`login`: component = <LoginView onsubmit={login.bind(this)}/>; break;
        case`register`: component = <Register/>; break;

        default: break;
    }

    ReactDOM.render(
        component,
        $(`#root`)[0]
    );
}

export default changeView;