 import React, {Component} from 'react';
 import $ from 'jquery'
 import ReactDOM from 'react-dom';
 import LoginView from '../views/LoginView'
 import RegisterView from '../views/RegisterView'
 import FamilyTreeView from "../views/FamilyTreeView";
 import login from './UserController';

function changeView(view, data) {
    let component;
    switch(view) {
        case`login`: component = <LoginView onsubmit={login.bind(this)}/>; break;
        case`register`: component = <RegisterView/>; break;
        case`familyTree`: component = <FamilyTreeView />; break;

        default: break;
    }

    ReactDOM.render(
        component,
        $(`#root`)[0]
    );
}

export default changeView;