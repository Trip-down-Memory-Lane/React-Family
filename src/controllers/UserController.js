import KinveyRequester from '../services/KinveyRequester';

class UserController{

     login(username,password){
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            console.log(userInfo.username + ' successfully logged in.');
        }

        function saveAuthInSession(userInfo) {
            sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
            sessionStorage.setItem('userId', userInfo._id);
            sessionStorage.setItem('username', userInfo.username);

        }
    }
}

let userController=new UserController();
export default  userController;
