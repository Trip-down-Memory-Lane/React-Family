import KinveyRequester from '../services/KinveyRequester';

    function login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            console.log(userInfo.username + ' successfully logged in.');
        }
    }

    function saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        // this.setState({
        //     username: userInfo.username,
        //     userId: userInfo._id
        // });
    }


export default login;
