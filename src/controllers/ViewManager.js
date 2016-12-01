import React from 'react';
import $ from 'jquery'
import ReactDOM from 'react-dom';
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import EditProfileView from '../views/EditProfileView'
import FamilyTreeView from "../views/FamilyTreeView";
import Nav from '../views/Nav';
import {Router, Route, hashHistory, Link} from 'react-router';

function changeView() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={LoginView}></Route>
            <Route path="/register" component={RegisterView}></Route>
            <Route path="/profile/edit" component={EditProfileView}></Route>
            <Route path="/tree" component={FamilyTreeView}></Route>
            <Route path="/profile" component={Nav}></Route>
        </Router>,
        $(`#root`)[0]
    );
}

export default changeView;