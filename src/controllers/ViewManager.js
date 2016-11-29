 import React from 'react';
 import $ from 'jquery'
 import ReactDOM from 'react-dom';
 import LoginView from '../views/LoginView'
 import RegisterView from '../views/RegisterView'
 import FamilyTreeView from "../views/FamilyTreeView";
 import Path from '../constants/constant'
 import userController from './UserController';

function changeView(view, data) {
    let component;
    switch(view) {
        case Path.loginView(): component = <LoginView onsubmit={userController.login.bind(this)}/>; break;
        case Path.registerView(): component = <RegisterView/>; break;
        case Path.familyTreeView(): component = <FamilyTreeView />; break;

        default: break;
    }

    ReactDOM.render(
        component,
        $(`#root`)[0]
    );
}

export default changeView;