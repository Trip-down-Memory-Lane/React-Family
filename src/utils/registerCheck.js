
import KinveyRequester from '../services/KinveyRequester';

class RegisterChecker{

    isLoginAfterRegister(){

        let userId = sessionStorage.getItem('userId');
        return KinveyRequester.getUserInfo(userId).age;
    }
}

let registerChecker = new RegisterChecker();
export default registerChecker;