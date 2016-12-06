import React, {Component} from 'react';
import UserProfile from './UserProfile';
import UserController from '../../controllers/UserController';
import GuestView from '../GuestView'

export default class CatalogPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            basicInfo: '',
            pictures: [],
        };

        this.onLoadUserInfoSuccess = this.onLoadUserInfoSuccess.bind(this);
        this.onLoadUserPicturesSuccess = this.onLoadUserPicturesSuccess.bind(this);
    }

    componentWillMount() {
        UserController.loadUserInfo(this.props.params.userId, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(this.props.params.userId, this.onLoadUserPicturesSuccess)
    }

    onLoadUserInfoSuccess(response) {
        this.setState({
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
        });
    }

    onLoadUserPicturesSuccess(response) {
        let userPictures = [];

        console.log('on load pictures success');
        for (let pic of response) {
            // userPictures.push(pic.imageUrl);
            // console.log(pic);
            let picture = {};
            picture.original = pic.imageUrl;
            picture.thumbnail = pic.imageUrl;
            if (pic.hasOwnProperty('description')) {
                picture.description = pic.description;
            }
            userPictures.push(picture);
        }

        this.setState({images: userPictures})
    }

    render() {
        let userId={}
        if (this.props.params) {
             userId = this.props.params.userId
        }


        return (
            <div>
                <h1>User profile</h1>
                <GuestView
                    userId={userId}
                    images={this.state.images}
                    username={this.state.username}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    basicInfo={this.state.basicInfo}
                />
            </div>
        )
    }
}