import Path from '../constants/constant';

class Authenticator{

    static isAuthenticated(){
        //console.log(sessionStorage.getItem('userId'));
        return sessionStorage.getItem('userId') ;
    }

    static getKinveyUserAuthHeaders() {
    return {
        'Authorization': Path.database() + sessionStorage.getItem('authToken'),
    };
}
}

export default Authenticator
