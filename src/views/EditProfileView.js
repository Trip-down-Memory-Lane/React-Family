import React, { Component } from 'react';
import Path from '../constants/constant'
import '../styles/EditProfile.css';

class EditProfileView extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: Path.initialFirstName(),
            lastName: Path.initialLastName(),
            birthDate: Path.initialBirthDate(),
            aboutMe: Path.initialAboutMe()
        };

        this.handleChangePicClick = this.handleChangePicClick.bind(this);
    }

    handleChangePicClick() {

    }

    
    render() {
        return (
            <div className="container">
                <br />
                    <br />
                        <div className="row" id="main">
                            <div className="col-md-4 well" id="leftPanel">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div>
                                            <img src="http://lorempixel.com/200/200/abstract/1/" alt="Texto Alternativo" className="img-circle img-thumbnail" />

                                            <div>
                                                <input type="file" className="btn btn-warning"
                                                        id="change-picture" onClick={this.handleChangePicClick} value="Change profile" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 well" id="rightPanel">
                                <div className="row">
                                    <div className="col-md-12">
                                        <form role="form">
                                            <h2>Edit your profile.<small>It's always easy</small></h2>
                                            <hr className="colorgraph" />
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" name="first_name" id="first_name" className="form-control input-lg" placeholder="First Name" tabindex="1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" name="last_name" id="last_name" className="form-control input-lg" placeholder="Last Name" tabindex="2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabindex="4" />
                                                </div>

                                            <div className="form-group">
                                                <input type="date" name="birth_date" id="birth-date" className="form-control input-lg" placeholder="Date of birth" tabindex="5" />
                                            </div>

                                                <div className="row">
                                        <div className="col-xs-12">
                                                <div className="form-group">
                                                    <textarea name="about" rows="5" id="about" className="form-control input-lg" placeholder="About me..." tabIndex="7"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" tabindex="5" />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password" tabindex="6" />
                                                </div>
                                            </div>

                                        </div>

                                                <hr className="colorgraph" />
                                                    <div className="row">
                                                        <div className="col-xs-12 col-md-6"></div>
                                                        <div className="col-xs-12 col-md-6"><a href="#" className="btn btn-success btn-block btn-lg">Save</a></div>
                                                    </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal fade" id="t_and_c_m" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                <h4 className="modal-title" id="myModalLabel">Terms & Conditions</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" data-dismiss="modal">I Agree</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default EditProfileView;

