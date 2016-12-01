import Path from '../constants/constant';

class Authenticator {

    isAuthenticated() {
        return sessionStorage.getItem('userId');
    }

    getKinveyUserAuthHeaders() {
        return {
            'Authorization': Path.database() + sessionStorage.getItem('authToken'),
        }
    }
}

let authenticator = new Authenticator();
export default authenticator
