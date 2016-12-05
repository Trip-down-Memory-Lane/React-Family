import React, {Component} from 'react';
import Path from '../../constants/constant'
import '../../styles/EditProfile.css';
import EditProfileForm from './EditProfileForm';
import UserController from '../../controllers/UserController';
import ViewManager from '../../controllers/ViewManager';
import $ from 'jquery';

export default class EditProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: Path.initialEmail(),
            firstName: Path.initialFirstName(),
            lastName: Path.initialLastName(),
            basicInfo: Path.initialBasicInfo(),
            passwordReset: false,
            oldPassword: Path.initialPassword(),
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onPasswordClicked = this.onPasswordClicked.bind(this);
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordCheckSuccess = this.onPasswordCheckSuccess.bind(this);
        this.onResetPasswordSuccess = this.onResetPasswordSuccess.bind(this);

        this.handleChangePicClick = this.handleChangePicClick.bind(this);
    }

    onPasswordChange(event){
        event.preventDefault();
        this.setState({oldPassword: event.target.value});
    }

    onPasswordClicked(event){
        event.preventDefault();

        this.setState({
            passwordReset: !this.state.passwordReset
        });
    }

    onPasswordSubmit(event){
        event.preventDefault();
        UserController.passwordCheck(this.state.oldPassword, this.onPasswordCheckSuccess)
    }

    onPasswordCheckSuccess(response){
        UserController.resetPassword(response.email, this.onResetPasswordSuccess);
    }

    onResetPasswordSuccess(){
        console.log('success');
        ViewManager.renderMessage('Email for password reset was sent to your registered email address.', 'success');
        this.context.router.push('home/profile');
    }

    onChangeHandler(event){
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    componentWillMount(){
        UserController.loadUserInfo(sessionStorage.getItem('userId'), this.onLoadSuccess);
        $('body').css('background', '#d0e5e2')
    }

    onLoadSuccess(response){
        this.setState({
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        UserController.editUser(
            sessionStorage.getItem('userId'),
            this.state.email,
            this.state.firstName,
            this.state.lastName,
            this.state.basicInfo,
            this.onEditSuccess
        );
    }

    onEditSuccess(response){
        ViewManager.renderMessage('Profile edited.', 'success');
        this.context.router.push('home/profile');
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
        return (
            <div>
                <EditProfileForm
                    email={this.state.email}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    basicInfo={this.state.basicInfo}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                    onPasswordClicked={this.onPasswordClicked}
                    passwordReset={this.state.passwordReset}
                    onPasswordSubmit={this.onPasswordSubmit}
                    onPasswordChange={this.onPasswordChange}
                    oldPassword={this.state.oldPassword}
                />
            </div>
        )
    }
}

EditProfileView.contextTypes = {
    router: React.PropTypes.object
};

