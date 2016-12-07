import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import {Router, Route, browserHistory} from 'react-router';

import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import EditProfileView from '../views/editProfile/EditProfileView'
import FamilyTreeView from "../views/FamilyTreeView";
import ListUsers from '../views/listUsers/ListUsersView';
import UserProfile from '../views/userProfile/userProfileView';
import Message from '../components/Message';
import MainPage from '../App';

import Authenticator from '../utils/authentication';
import Path from '../constants/constant';
import Advert from '../views/MyView'
class ViewManager{
    static changeView() {
        ReactDOM.render(
            <Router history={browserHistory}>
                <Route path="/" component={LoginView}
                       onEnter={Authenticator.isLoggedIn}/>
                <Route path="register"
                       component={RegisterView} />

                <Route path="home/password"
                       component={RegisterView}
                       onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
                <Route path="/advert" component={Advert}/>

                <Route path="/home" component={MainPage}>
                    <Route path="/home/profile/:userId"
                           component={UserProfile}
                           onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />

                    <Route path="/home/profile/:userId/:treeId"
                           component={FamilyTreeView}
                           onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />

                    <Route path="/home/users"
                           component={ListUsers}
                           onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
                    <Route path="/home/edit"
                           component={EditProfileView}
                           onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />

                    {/*<Route path="/home/profile/me"*/}
                           {/*component={ProfileView}*/}
                           {/*onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />*/}

                    <Route path="/tree"
                           component={FamilyTreeView}
                           onEnter={(a, b) => Authenticator.requireAuth(Path.loginView())} />
                </Route>
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
