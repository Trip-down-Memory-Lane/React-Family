import React from 'react';
import $ from 'jquery'
import ReactDOM from 'react-dom';
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import EditProfileView from '../views/EditProfileView'
import FamilyTreeView from "../views/FamilyTreeView";
import Nav from '../views/Nav';
import {Router, Route, browserHistory, Link} from 'react-router';
import SuccessMessage from '../components/messages/successMessage';
import InfoMessage from '../components/messages/infoMessage';
import ErrorMessage from '../components/messages/errorMessage';
import WarningMessage from '../components/messages/warningMessage';
import Authenticator from '../utils/authentication';
import Path from '../constants/constant';

class ViewManager{
    static changeView() {
        ReactDOM.render(
            <Router history={browserHistory}>
                <Route path="/" component={LoginView}
                       onEnter={Authenticator.isLoggedIn}>
                    Login
                </Route>
                <Route path="/register"
                       component={RegisterView}>
                    Register
                </Route>
                <Route path="/profile/edit"
                       component={EditProfileView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())}>
                    Edit profile
                </Route>
                <Route path="/tree"
                       component={FamilyTreeView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())}>
                    Tree
                </Route>
                <Route path="/profile"
                       component={Nav}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())}>
                    Profile
                </Route>
            </Router>,
            $(`#root`)[0]
        );
    }

    static renderSuccessMessage(message) {
        ReactDOM.render(
            <SuccessMessage message={message}/>,
            $('#message')[0]
        );
    }

    static renderErrorMessage(message) {
        ReactDOM.render(
            <ErrorMessage message={message}/>,
            $('#message')[0]
        );
    }

    static renderInfoMessage(message) {
        ReactDOM.render(
            <InfoMessage message={message}/>,
            $('#message')[0]
        );
    }

    static renderWarningMessage(message) {
        ReactDOM.render(
            <WarningMessage message={message}/>,
            $('#message')[0]
        );
    }
}

export default ViewManager;
