import React, {Component} from 'react';
//import Path from '../../constants/constant'
import '../../styles/EditProfile.css';
import EditProfileForm from './EditProfileForm';
import Footer from '../../components/Footer';
import UserController from '../../controllers/UserController';
import ViewManager from '../../controllers/ViewManager';
import $ from 'jquery'
export default class EditProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            basicInfo: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);

        this.handleChangePicClick = this.handleChangePicClick.bind(this);
    }

    onChangeHandler(event){
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    componentDidMount(){
        UserController.loadUserInfo(sessionStorage.getItem('userId'), this.onLoadSuccess);
    }
    componentWillMount(){
        $('body').css('background', '#d0e5e2')

    }

    onLoadSuccess(response){
        this.setState({
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        UserController.editUser(
            sessionStorage.getItem('userId'),
            this.state.firstName,
            this.state.lastName,
            this.state.basicInfo,
            this.onEditSuccess
        );
    }

    onEditSuccess(response){
        this.context.router.push('profile');
        ViewManager.renderMessage('Profile edited.', 'success');
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
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    basicInfo={this.state.basicInfo}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                />
                <Footer/>
            </div>
        )
    }
}

EditProfileView.contextTypes = {
    router: React.PropTypes.object
};

