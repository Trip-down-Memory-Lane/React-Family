import React from 'react';
import $ from 'jquery'
import ReactDOM from 'react-dom';
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import EditProfileView from '../views/EditProfileView'
import FamilyTreeView from "../views/FamilyTreeView";
import ProfileView from '../views/ProfileView';
import {Router, Route, browserHistory} from 'react-router';
import Message from '../components/Message';
import Authenticator from '../utils/authentication';
import Path from '../constants/constant';

class ViewManager{
    static changeView() {
        ReactDOM.render(
            <Router history={browserHistory}>
                <Route path="/" component={LoginView}
                       onEnter={Authenticator.isLoggedIn} />
                <Route path="/register"
                       component={RegisterView} />
                <Route path="/profile/edit"
                       component={EditProfileView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
                <Route path="/tree"
                       component={FamilyTreeView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
                <Route path="/profile"
                       component={ProfileView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
            </Router>,
            $(`#root`)[0]
        );
    }

    static renderMessage(message, type) {
        ReactDOM.render(
            <Message message={message} type={type}/>,
            $('#message')[0]
        );
    }
}

export default ViewManager;
