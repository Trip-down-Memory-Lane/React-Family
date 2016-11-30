import React, {Component} from 'react';
import Path from '../constants/constant'
import '../styles/EditProfile.css';
import {Button} from 'reactstrap';
import authenticator from '../utils/authentication';
import navigator from '../utils/navigation';

class EditProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            aboutMe: '',
            password: Path.initialPassword(),
            confirmPassword: Path.initialConfirmPassword()
        };

        this.handleChangePicClick = this.handleChangePicClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        alert("kur");
    }

    handleChangePicClick() {
        this.triggerOnChangeProfilePicClick();
    }

    triggerOnChangeProfilePicClick(){
        let event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        let node = document.getElementById('change-picture');
        node.dispatchEvent(event);
    }

    render() {
        console.log(authenticator.isAuthenticated());
        if (authenticator.isAuthenticated()){
            return (
                <div className="container">
                    <br />
                    <br />
                    <div className="row" id="main">
                        <div className="col-md-4 well" id="leftPanel">
                            <div className="row">
                                <div className="col-md-12">
                                    <div>
                                        <img src="http://lorempixel.com/200/200/abstract/1/" alt="Texto Alternativo"
                                             className="img-circle img-thumbnail"/>

                                        <div>
                                            <input type="file" className="btn btn-warning"
                                                   id="change-picture"
                                                   value="Change profile"/>
                                            <Button color="danger" onClick={this.handleChangePicClick}>Choose picture

                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 well" id="rightPanel">
                            <div className="row">
                                <div className="col-md-12">
                                    <form role="form" method="post" onSubmit={this.handleFormSubmit}>
                                        <h2>Edit your profile.</h2>
                                        <hr className="colorgraph"/>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text"
                                                           name="first_name" id="first_name"
                                                           className="form-control input-lg"
                                                           placeholder="First Name"
                                                           tabIndex="1"
                                                           ref={e => this.firstNameField = e}/>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text"
                                                           name="last_name"
                                                           id="last_name"
                                                           className="form-control input-lg"
                                                           placeholder="Last Name"
                                                           tabIndex="2"
                                                           ref={e => this.lastNameField = e}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email"
                                                   name="email" id="email"
                                                   className="form-control input-lg"
                                                   placeholder="Email Address"
                                                   tabIndex="4"
                                                   ref={e => this.emailField = e}/>
                                        </div>

                                        <label>Required</label>
                                        <div className="form-group">
                                            <input type="number"
                                                   name="birth_date"
                                                   id="birth-date"
                                                   className="form-control input-lg"
                                                   placeholder="Age"
                                                   tabIndex="6"
                                                   required
                                                   ref={e => this.ageField = e}/>
                                        </div>

                                        <div className="col-xs-12">
                                            <div className="form-group">
                                                <textarea name="about"
                                                          rows="5"
                                                          id="about"
                                                          className="form-control input-lg"
                                                          placeholder="About me..."
                                                          tabIndex="7"
                                                          ref={e => this.aboutField = e}></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="password"
                                                           name="password"
                                                           id="password"
                                                           className="form-control input-lg"
                                                           placeholder="Password"
                                                           tabIndex="8"
                                                           ref={e => this.passwordFied = e}/>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="password"
                                                           name="password_confirmation"
                                                           id="password_confirmation"
                                                           className="form-control input-lg"
                                                           placeholder="Confirm Password"
                                                           tabIndex="9"
                                                           ref={e => this.confirmPasswordField = e}/>
                                                </div>
                                            </div>

                                        </div>

                                        <hr className="colorgraph"/>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-6"></div>
                                            <div className="col-xs-12 col-md-6"><button className="btn btn-success btn-block btn-lg">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            navigator.navigate(Path.loginView());
        }

    }
}

export default EditProfileView;

