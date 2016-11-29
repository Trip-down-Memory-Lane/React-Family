import KinveyRequester from '../services/KinveyRequester';

class UserController {

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            UserController.saveAuthInSession(userInfo);
            // TODO render profile page view
            console.log(userInfo.username + ' successfully logged in.');
        }
    }

    register(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            // TODO error message
            alert("Passwords don't match.");
        }
        // else will be removed after rendering the error message
        else {
            KinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this));
                // TODO catch error message


            function registerSuccess(userInfo) {
                UserController.saveAuthInSession(userInfo);

                // TODO render edit profile page view
                console.log(userInfo.username + ' successfully registered.');
            }
        }
    }

    static saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }
}

let userController = new UserController();
export default  userController;
