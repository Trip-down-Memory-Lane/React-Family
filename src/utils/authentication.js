import Path from '../constants/constant';
import { browserHistory } from 'react-router';
import ViewManager from '../controllers/ViewManager';

class Authenticator {

    static isAuthenticated(){
        return sessionStorage.getItem('userId') ;
    }

    static getKinveyUserAuthHeaders() {
        return {
            'Authorization': Path.database() + sessionStorage.getItem('authToken'),
        };
    }

    static requireAuth(replace){
        if (!Authenticator.isAuthenticated()){
            browserHistory.push(replace);
        }
    }

    static isLoggedIn(){
        if (Authenticator.isAuthenticated()){
            ViewManager.renderWarningMessage('You are already logged in.');
            // TODO stay on page
        }
    }
}

export default Authenticator
