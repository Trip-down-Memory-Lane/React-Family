import React from 'react';
import $ from 'jquery'
import ReactDOM from 'react-dom';
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import FamilyTreeView from "../views/FamilyTreeView";
import Path from '../constants/constant'
import {Router, Route, hashHistory, Link} from 'react-router';


function changeView(view, data) {
    // let reactComponent =  LoginView ;
    // switch (view) {
    //     case Path.loginView():
    //         reactComponent = <LoginView onsubmit={userController.login.bind(this)}/>;
    //         break;
        // case Path.registerView():
        //     reactComponent = <RegisterView onsubmit={userController.register.bind(this)}/>;
        //     break;
        // case Path.familyTreeView():
        //     reactComponent = <FamilyTreeView />;
        //     break;
    //     default:
    //         break;
    // }


    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={LoginView}></Route>
            <Route path="/register" component={RegisterView}></Route>
            <Route path="/tree" component={FamilyTreeView}></Route>

        </Router>,
        $(`#root`)[0]
    );
}

export default changeView;