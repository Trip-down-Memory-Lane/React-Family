import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import '../public/loginHelper/css/form-elements.css'
import '../public/loginHelper/css/style.css'
import  changeView from './viewManager'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``
        };
        this.onRegisterClicked = this.onRegisterClicked.bind(this)
        this.onLoginClicked = this.onLoginClicked.bind(this)

    }

    onUserNameClicked(event) {
        this.state.username = event.target.value;
    }

    onPasswordClicked() {

    }

    onRegisterClicked() {
        changeView('register');
        console.log('REGISTERED');
    }

    onLoginClicked(event) {

    }

    render() {
        return (
            <div className="top-content">
                <div className="inner-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 text">
                                <h1><strong>Family Tree</strong></h1>
                                <div className="description">
                                    <p>
                                        Create your own family tree...easy and free
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 form-box">
                                <div className="form-top">
                                    <div className="form-top-left">
                                        <h3>Login to our site</h3>
                                        <p>Enter your username and password to log on:</p>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="login-form">
                                        <div className="form-group">
                                            <label className="sr-only">Username</label>
                                            <input type="text" name="form-username" placeholder="Username..."
                                                   className="form-username form-control" id="form-username"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only">Password</label>
                                            <input type="password" name="form-password" placeholder="Password..."
                                                   className="form-password form-control" id="form-password"/>
                                        </div>
                                        <button type="submit" className="btn">Sign in !</button>
                                        <div id="register"

                                             className="btn" onClick={() => changeView(`register`)}><a >Register !</a ></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 social-login">
                                <h3>...or login with:</h3>

                                <div className="social-login-buttons">
                                    <a className="btn btn-link-1 btn-link-1-facebook" href="#">
                                        <i className="fa fa-facebook"></i> Facebook
                                    </a>
                                    <a className="btn btn-link-1 btn-link-1-twitter" href="#">
                                        <i className="fa fa-twitter"></i> Twitter
                                    </a>
                                    <a className="btn btn-link-1 btn-link-1-google-plus" href="#">
                                        <i className="fa fa-google-plus"></i> Google Plus
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;
