import React, {Component} from 'react';
import userController from '../controllers/UserController';
import Path from '../constants/constant'
import BackToLogin from '../components/BackToLogin'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: Path.initialUsername(),
            password: Path.initialPassword(),
            confirmPassword: Path.initialConfirmPassword(),
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        userController.register(
            this.usernameField.value,
            this.passwordField.value,
            this.confirmPasswordField.value);
    }

    render(){
        return(
            <div className="top-content">
                <div className="inner-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 text">
                                <h1><strong>Register in Family Tree</strong> </h1>
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

                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post"
                                          className="login-form" onSubmit={this.handleFormSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label className="sr-only" >Username</label>
                                            <input type="text" name="form-username"
                                                   placeholder="Username..." className="form-username form-control"
                                                   id="form-username" required ref={ e => this.usernameField = e }/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" >Password</label>
                                            <input type="password" name="form-password" placeholder="Password..." className="form-password form-control" id="form-password"
                                                   required ref={ e => this.passwordField = e }/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" >Password</label>
                                            <input type="password" name="form-password" placeholder="Confirm Password..." className="form-password form-control" id="form-password"
                                                   required ref={ e => this.confirmPasswordField = e }/>
                                        </div>
                                        <div id="register"><button type="submit" className="btn">Register !</button></div>
                                       <BackToLogin></BackToLogin>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Register